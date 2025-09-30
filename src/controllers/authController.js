import  {authService}  from "../services/authService.js";

class AuthController {
  constructor(services) {
    this.services = services;
  }

  register = async (req, res, next) => {
    try {
      const resp = await this.services.register(req.body);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.services.login(email, password);
      const token = this.services.generateToken(user);
      res.cookie("accessToken", token, { httpOnly: true }).json({
        message: "login success",
      });
    } catch (error) {
        next(error)
    }
  };
}

export const authController = new AuthController(authService)
