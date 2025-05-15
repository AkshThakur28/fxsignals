const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../../config/db");
const AuthModel = require("../../models/admin/authModel");

const authController = {
  signup: async (req, res) => {
    const { firstname, lastname, email, mobile_no, password, confirmPassword } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !mobile_no ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
      const [existingUser] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email already exists." });
      }

      const username = `${firstname} ${lastname}`.trim();
      const hashedPassword = await bcrypt.hash(password, 10);

      await db
        .promise()
        .query(
          "INSERT INTO users (username, firstname, lastname, email, mobile_no, password, is_admin, is_premium, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())",
          [
            username,
            firstname,
            lastname,
            email,
            mobile_no,
            hashedPassword,
            0,
            0,
          ]
        );

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }

    try {
      const [userResult] = await db.promise().query(
        `SELECT users.*, role.role_name 
          FROM users 
          LEFT JOIN role ON users.is_admin = role.id 
          WHERE users.email = ?`,
        [email]
      );

      if (userResult.length === 0) {
        return res.status(401).json({ message: "Invalid Email or Password." });
      }

      const user = userResult[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid Email or Password." });
      }

      const { password: _, created_at, updated_at, ...sessionUser } = user;

      req.session.user = sessionUser;

      res.status(200).json({
        message: "Login successful",
        user: req.session.user,
      });
    } catch (error) {
      console.error("Error during login:", error); 
      return res.status(500).json({ message: error.message || "An error occurred. Please try again." });
    }

  },

  me: (req, res) => {
    if (req.session && req.session.user) {
      return res.status(200).json({ user: req.session.user });
    } else {
      return res.status(401).json({ message: "Not logged in" });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "An error occurred while logging out. Please try again.",
          });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully." });
    });
  },

  requestPasswordReset: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    try {
      const [user] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

      if (user.length === 0) {
        return res
          .status(404)
          .json({ message: "User with this email does not exist." });
      }

      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      AuthModel.saveOTP(email, otp, expiresAt, (err) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Could not process the request. Please try again.",
            });
        }

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP is ${otp}. It expires in 10 minutes.`,
        });

        res.status(200).json({ message: "OTP sent to email." });
      });
    } catch (error) {
      console.error("Error during password reset request:", error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  },

  verifyOTP: (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    AuthModel.verifyOTP(email, otp, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred. Please try again." });
      }

      if (result === "expired") {
        return res.status(400).json({ message: "OTP has expired." });
      }

      if (!result) {
        return res.status(400).json({ message: "Invalid OTP." });
      }

      res.status(200).json({ message: "OTP verified successfully." });
    });
  },

  resetPassword: (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    AuthModel.resetPassword(email, password, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred. Please try again." });
      }

      res.status(200).json({ message: "Password reset successfully." });
    });
  },
};

module.exports = authController;
