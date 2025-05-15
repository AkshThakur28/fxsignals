const db = require("../../config/db");

const UserModel = {
  getAllUsers: async () => {
    try {
      const [users] = await db
        .promise()
        .query(
          "SELECT id, username, firstname, lastname, email, mobile_no FROM users"
        );
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  },

  findUserByEmail: async (email) => {
    try {
      return await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  },

  addUser: async ({
    firstname,
    lastname,
    email,
    mobile_no,
    password,
    role,
  }) => {
    const username = `${firstname} ${lastname}`.trim();
    try {
      await db
        .promise()
        .query(
          "INSERT INTO users (username, firstname, lastname, email, mobile_no, password, is_admin, is_premium, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())",
          [username, firstname, lastname, email, mobile_no, password, role, 0]
        );
    } catch (error) {
      throw new Error("Error adding user: " + error.message);
    }
  },

  fetchUserById: async (id) => {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT id, firstname, lastname, email, mobile_no, is_admin AS role FROM users WHERE id = ?",
          [id]
        );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
},


  updateUserById: async ({
    id,
    firstname,
    lastname,
    email,
    mobile_no,
    role,
  }) => {
    const username = `${firstname} ${lastname}`.trim();
    try {
      await db
        .promise()
        .query(
          "UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?, mobile_no = ?, is_admin = ?, updated_at = NOW() WHERE id = ?",
          [username, firstname, lastname, email, mobile_no, role, id]
        );
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  deleteUserById: async (id) => {
    try {
      await db.promise().query("DELETE FROM users WHERE id = ?", [id]);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  },

  roleFetch: async () => {
    try {
      const [roles] = await db.promise().query("SELECT * FROM role");
      return roles;
    } catch (error) {
      throw new Error("Error fetching roles: " + error.message);
    }
  },
};

module.exports = UserModel;
