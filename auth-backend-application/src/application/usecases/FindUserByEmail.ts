import UserRepository from "../repositories/UserRepository";
import Exception from "@shared/exceptions/Exception";

import * as httpStatus from "@shared/constants/https-status";

type Response = {
  status: number;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export default class FindUserByEmail {
  constructor(readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
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