const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const AuthModel = {
  saveOTP: (email, otp, expiresAt, callback) => {
    const query = `
      INSERT INTO password_reset (email, otp, expires_at) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?
    `;
    db.query(query, [email, otp, expiresAt, otp, expiresAt], callback);
  },

  verifyOTP: (email, otp, callback) => {
    const query = `
      SELECT * FROM password_reset 
      WHERE email = ? AND otp = ?
    `;
    db.query(query, [email, otp], (err, results) => {
      if (err) return callback(err); 
      if (results.length === 0) return callback(null, false);
      const { expires_at } = results[0];
      if (new Date() > new Date(expires_at)) {
        return callback(null, 'expired'); 
      }

      callback(null, 'valid'); 
    });
  },

  resetPassword: (email, newPassword, callback) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10); 
    const query = `
      UPDATE users 
      SET password = ? 
      WHERE email = ?
    `;
    db.query(query, [hashedPassword, email], callback);
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
