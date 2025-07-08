const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const AuthModel = {
  createUser: async (userData) => {
    const query = `
    INSERT INTO users 
    (username, firstname, lastname, email, mobile_no, password, is_admin, is_premium, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;
    const values = [
      userData.username,
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.mobile_no,
      userData.hashedPassword,
      2,
      0,
    ];
    return db.promise().query(query, values);
  },

  async canSendOTP(email) {
    const [count10Min] = await db.promise().query(
      `
      SELECT COUNT(*) as count FROM password_otps
      WHERE email = ? AND created_at > (NOW() - INTERVAL 10 MINUTE)
    `,
      [email]
    );

    const [countDay] = await db.promise().query(
      `
      SELECT COUNT(*) as count FROM password_otps
      WHERE email = ? AND created_at > (NOW() - INTERVAL 1 DAY)
    `,
      [email]
    );

    return {
      inCooldown: count10Min[0].count >= 3,
      maxReached: countDay[0].count >= 10,
    };
  },

  async saveOTP(email, otp, expiresAt) {
    const query = `
      INSERT INTO password_otps (email, otp, expires_at) 
      VALUES (?, ?, ?)
    `;
    return db.promise().query(query, [email, otp, expiresAt]);
  },

  async verifyOTP(email, otp) {
    const [rows] = await db.promise().query(
      `
      SELECT * FROM password_otps 
      WHERE email = ? AND otp = ? AND used = FALSE
      ORDER BY created_at DESC
      LIMIT 1
    `,
      [email, otp]
    );

    if (rows.length === 0) return { status: "invalid" };

    const record = rows[0];

    if (new Date(record.expires_at) < new Date()) {
      return { status: "expired" };
    }

    await db.promise().query(
      `
      UPDATE password_otps SET used = TRUE 
      WHERE id = ?
    `,
      [record.id]
    );

    return { status: "valid" };
  },

  resetPassword: async (email, hashedPassword) => {
    const query = `
    UPDATE users 
    SET password = ? 
    WHERE email = ?
  `;
    return db.promise().query(query, [hashedPassword, email]);
  },

  getUserByEmail: (email, callback) => {
    const query = `
      SELECT * FROM users 
      WHERE email = ?
    `;
    db.query(query, [email], callback);
  },

  saveSession: (userId, sessionId, callback) => {
    const query = `
      INSERT INTO sessions (user_id, session_id, created_at) 
      VALUES (?, ?, NOW())
    `;
    db.query(query, [userId, sessionId], callback);
  },

  deleteSession: (sessionId, callback) => {
    const query = `
      DELETE FROM sessions 
      WHERE session_id = ?
    `;
    db.query(query, [sessionId], callback);
  },
};

module.exports = AuthModel;
