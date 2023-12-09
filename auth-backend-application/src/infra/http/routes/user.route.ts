import { Router } from "express";

import UserController from "../controllers/UserController";
import checkToken from "@shared/middlewares/CheckToken";
import SequelizeUserRepository from "@infra/database/repositories/SequelizeUserRepository";
import AuthenticateUser from "@application/usecases/AuthenticateUser";
import FindUserByEmail from "@application/usecases/FindUserByEmail";

const userRouter = Router();

const sequelizeUserRepository = new SequelizeUserRepository();
const authenticateUserService = new AuthenticateUser(sequelizeUserRepository);
const findUserByEmailService = new FindUserByEmail(sequelizeUserRepository);
const userController = new UserController(authenticateUserService, findUserByEmailService);

userRouter.get("/api/user/email/:email", checkToken, async (request, response) => {
  await userController.getUserProfileByEmail(request, response);
});

userRouter.post("/api/user/auth", async (request, response) => {
  await userController.login(request, response);
});

export default userRouter;