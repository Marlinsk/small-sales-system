import UserRepository from "../repositories/UserRepository";
import Exception from "@shared/exceptions/Exception";

import * as httpStatus from "@shared/constants/https-status";

export default class FindUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<{
    status: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
    message?: undefined;
  } | {
    status: any;
    message: any;
    user?: undefined;
  }> {
    try {
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
    } catch (error: any) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}