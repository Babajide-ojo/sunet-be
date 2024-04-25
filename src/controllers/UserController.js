// controllers/userController.js
const userService = require("../services/UserService");

class UserController {
  async createUser(req, res, next) {
    try {
      // Check if email already exists
      const existingUser = await userService.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Validate request body
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }

      // Create user
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      console.log({users});
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(req, res, next) {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ message: "Please provide an email address" });
        }

        // Save/reset token with user's email
        await userService.saveResetToken(email);

        res.json({ message: "Password reset email sent successfully" });
    } catch (error) {
        next(error);
    }
}

  // Add more controller methods as needed
}

module.exports = new UserController();
