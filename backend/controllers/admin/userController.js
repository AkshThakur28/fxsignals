const UserModel = require("../../models/admin/userModel");
const bcrypt = require("bcryptjs");

const userController = {
  users_view: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  },

  users_add: async (req, res) => {
    const { firstname, lastname, email, mobile_no, password, role } = req.body;

    if (!firstname || !lastname || !email || !mobile_no || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const [existingUser] = await UserModel.findUserByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.addUser({
        firstname,
        lastname,
        email,
        mobile_no,
        password: hashedPassword,
        role,
      });

      res.status(201).json({ message: "User added successfully." });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Failed to add user." });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      const user = await UserModel.fetchUserById(id);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user." });
    }
  },

  users_edit: async (req, res) => {
    const { id, firstname, lastname, email, mobile_no, role } = req.body;

    if (!id || !firstname || !lastname || !email || !mobile_no || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      await UserModel.updateUserById({
        id,
        firstname,
        lastname,
        email,
        mobile_no,
        role,
      });

      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user." });
    }
  },

  users_delete: async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      await UserModel.deleteUserById(id);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user." });
    }
  },

  users_roles: async (req, res) => {
    try {
      const roles = await UserModel.roleFetch();
      res.status(200).json({ message: "Roles fetched successfully", roles });
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: "Failed to fetch roles" });
    }
  },
};

module.exports = userController;
