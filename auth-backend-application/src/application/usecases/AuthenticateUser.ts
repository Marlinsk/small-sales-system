import "dotenv/config";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import UserRepository from "../repositories/UserRepository";
import Exception from "@shared/exceptions/Exception";

import * as secret from "@shared/constants/secret";
import * as httpStatus from "@shared/constants/https-status";

export default class AuthenticateUser {
  constructor(readonly userRepository: UserRepository) {}
  
  async execute(email: string, password: string): Promise<{
    status: number;
    token: string;
    message?: undefined;
  } | {
    status: any;
    message: any;
    token?: undefined;
  }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      
      if (user === null) {
        throw new Exception(
          "Invalid email/password", 
          httpStatus.BAD_REQUEST
        );
      }
  
      if (!await compare(password , user.password)) {
        throw new Exception(
          "Email or password is incorrect", 
          httpStatus.UNAUTHORIZED
        );
      }
  
      const { JWT_SECRET } = secret;
  
      if (!JWT_SECRET) {
        throw new Exception(
          "Secret is not defined on the configuration.", 
          httpStatus.INTERNAL_SERVER_ERROR
        );
      }
  
      const authUser = { id: user.id, name: user.name, email: user.email };
  
      const accesstoken = sign({ authUser }, JWT_SECRET, {
        subject: String(user.id),
        expiresIn: "1d",
      });

      return { 
        status: httpStatus.SUCCESS,
        token: accesstoken
      }
    } catch (error: any) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }

  }
}