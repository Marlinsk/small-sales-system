import { Request, Response } from "express";

import AuthenticateUser from "@application/usecases/AuthenticateUser";
import FindUserByEmail from "@application/usecases/FindUserByEmail";

import ValidationClass from "@shared/validation";

import * as httpStatus from "@shared/constants/https-status";

export default class UserController {
  constructor(
    private readonly authenticateUserService: AuthenticateUser,
    private readonly findUserByEmailService: FindUserByEmail, 
  ) {}
  
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const output = await this.authenticateUserService.execute(email, password);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async getUserProfileByEmail(request: Request, response: Response): Promise<Response> {
    try {
      const { user } = request;
      const { email } = request.params;
      const output = await this.findUserByEmailService.execute(email);
      ValidationClass.userAuthenticated(output.user, user);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
