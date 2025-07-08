const { parsePhoneNumberFromString } = require("libphonenumber-js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../../config/db");
const AuthModel = require("../../models/admin/authModel");

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name) => /^[A-Za-z]+$/.test(name);
const getMobileValidationError = (mobile) => {
  const phoneNumber = parsePhoneNumberFromString(mobile);
  if (!phoneNumber) return "Invalid mobile number format.";
  if (!phoneNumber.isValid())
    return `Invalid mobile number for country ${phoneNumber.country}.`;
  return null;
};
const validatePassword = (password) => password.length >= 5;

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

const authController = {
  signup: async (req, res) => {
    const { firstname, lastname, email, mobile_no, password, confirmPassword } =
      req.body;

    if (!firstname || !validateName(firstname)) {
      return res.status(400).json({
        message: "Invalid or missing firstname. Only alphabets are allowed.",
      });
    }

    if (!lastname || !validateName(lastname)) {
      return res.status(400).json({
        message: "Invalid or missing lastname. Only alphabets are allowed.",
      });
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Invalid or missing email." });
    }

    if (!mobile_no) {
      return res.status(400).json({ message: "Mobile number is required." });
    }

    const mobileError = getMobileValidationError(mobile_no);
    if (mobileError) {
      return res.status(400).json({ message: mobileError });
    }

    if (!password || !validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long." });
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

      await AuthModel.createUser({
        username,
        firstname,
        lastname,
        email,
        mobile_no,
        hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Invalid or missing email." });
    }

    if (!password || !validatePassword(password)) {
      return res.status(400).json({
        message: "Invalid or missing password. Must be minimum 5 digits long.",
      });
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

      req.session.user = {
        fullname: user.username,
        email: user.email,
        role: user.role_name,
        mobile: user.mobile_no,
      };

      req.session.cookie.maxAge = SESSION_TIMEOUT_MS;

      res.status(200).json({
        message: "Login successful",
        user: req.session.user,
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res
        .status(500)
        .json({ message: "An error occurred. Please try again." });
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
          .json({ message: "Error logging out. Please try again." });
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
      const [[user]] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
      if (!user) return res.status(404).json({ message: "User not found." });

      const { inCooldown, maxReached } = await AuthModel.canSendOTP(email);

      if (maxReached) {
        return res.status(429).json({
          message: "OTP limit reached for today. Try again tomorrow.",
        });
      }

      if (inCooldown) {
        return res
          .status(429)
          .json({ message: "Too many OTP requests. Please wait 10 minutes." });
      }

      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await AuthModel.saveOTP(email, otp, expiresAt);

      req.session.resetEmail = email;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Password Reset OTP",
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      });

      res.status(200).json({ message: "OTP sent successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send OTP. Try again." });
    }
  },

  verifyOTP: async (req, res) => {
    const { otp } = req.body;
    const email = req.session.resetEmail;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ message: "OTP verification requires session email and OTP." });
    }

    try {
      const result = await AuthModel.verifyOTP(email, otp);

      if (result.status === "expired") {
        return res.status(400).json({ message: "OTP has expired." });
      }

      if (result.status === "invalid") {
        return res
          .status(400)
          .json({ message: "Invalid or already used OTP." });
      }

      req.session.resetVerified = true;

      return res.status(200).json({ message: "OTP verified successfully." });
    } catch (err) {
      console.error("OTP verification failed:", err);
      return res.status(500).json({ message: "Failed to verify OTP." });
    }
  },

  resetPassword: (req, res) => {
    const { password, confirmPassword } = req.body;
    const email = req.session.resetEmail;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    if (!req.session.resetVerified) {
      return res.status(401).json({ message: "OTP verification required." });
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 10); 

      AuthModel.resetPassword(email, hashedPassword)
        .then(() => {
          delete req.session.resetEmail;
          delete req.session.resetVerified;
          res.status(200).json({ message: "Password reset successfully." });
        })
        .catch((err) => {
          console.error("Password reset failed:", err);
          res.status(500).json({ message: "Failed to reset password." });
        });
    } catch (err) {
      console.error("Password reset failed:", err);
      res.status(500).json({ message: "Failed to reset password." });
    }
  },
};

module.exports = authController;
