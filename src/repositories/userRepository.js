import jwt from "jsonwebtoken";
import { userDao } from "../daos/userDao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValid } from "../utils/user-utils.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }


}

export const userRepository = new UserRepository(userDao)
