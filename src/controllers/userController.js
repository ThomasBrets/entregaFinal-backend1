import { userRepository } from "../repositories/userRepository.js";

class UserController {
  constructor(services) {
    this.services = services;
  }

  register = async (req, res, next) => {
    try {
      const response = await this.repository.register(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.repository.login(email, password);
      const token = this.repository.generateToken(user)
      res.cookie("accessToken", token, { httpOnly: true }).json({message: "Login success"})
    } catch (error) {
        next(error)
    }
  };
}

export const userController = new UserController(userRepository)
