import CustomError from "../utils/custom-error.js";
import {authRepository} from "../repositories/authRepository.js";
import { createHash, isValid } from "../utils/user-utils.js";
import jwt from "jsonwebtoken";


class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.repository.getUserByEmail(email);
      if (existUser) throw new CustomError("Usuario ya existe", 400);

      const resp = await this.repository.create({
        ...body,
        password: createHash(password),
      });
      if (!resp) throw new CustomError("Error al registrar usario", 400);

      return resp;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const existUser = await this.repository.getUserByEmail(email);
      if (!existUser) throw new CustomError("Credenciales incorrectas", 401);

      const isValidPass = isValid(password, existUser.password);
      if (!isValidPass) throw new CustomError("Credenciales incorrectas", 401);

      return existUser;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const token = jwt.sign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    return token
  };
}

export const authService = new AuthService(authRepository);
