import "dotenv/config";
import { injectable, inject } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import UserRepository from "../repositories/UserRepository";
import Exception from "../../shared/exceptions/Exception";

import * as secret from "../../shared/constants/secret";
import * as httpStatus from "../../shared/constants/https-status";

type Response = {
  status: number;
  token: string;
}

@injectable()
export default class AuthenticateUser {
  
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}
  
  async execute(email: string, password: string): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
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

    const { API_SECRET } = secret;

    if (!API_SECRET) {
      throw new Exception(
        "Secret is not defined on the configuration.", 
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const authUser = { id: user.id, name: user.name, email: user.email };

    const accesstoken = sign({ authUser }, API_SECRET, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return { 
      status: httpStatus.SUCCESS,
      token: accesstoken
    }
  }
}