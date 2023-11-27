import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUser from "@application/usecases/AuthenticateUser";
import FindUserByEmail from "@application/usecases/FindUserByEmail";
import Validations from "@shared/validations";
import * as httpStatus from "@shared/constants/https-status";

export default class UserController {
  async getUserProfileByEmail(request: Request, response: Response): Promise<Response> {
    try {
      const { user } = request;
      const { email } = request.params;
      const validate = container.resolve(Validations);
      const findUserByEmail = container.resolve(FindUserByEmail);
      const output = await findUserByEmail.execute(email);
      validate.userAuthenticated(output.user, user);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const authenticate = container.resolve(AuthenticateUser);
      const output = await authenticate.execute(email, password);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
