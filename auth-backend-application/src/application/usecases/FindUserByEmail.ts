import { injectable, inject } from "tsyringe";

import UserRepository from "../repositories/UserRepository";
import Exception from "../../shared/exceptions/Exception";

import * as httpStatus from "../../shared/constants/https-status";

type Response = {
  status: number;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

@injectable()
export default class FindUserByEmail {
  constructor(
    @inject("UserRepository")
    readonly userRepository: UserRepository
  ) {}

  async execute(email: string): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Exception(
        `Not exist user with email ${email}`, 
        httpStatus.NOT_FOUND
      );
    }

    return {
      status: httpStatus.SUCCESS,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }
  }
}