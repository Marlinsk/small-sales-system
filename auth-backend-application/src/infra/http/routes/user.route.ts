import { Router } from "express";

import UserController from "../controllers/UserController";
import checkToken from "@shared/config/auth/CheckToken";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/email/:email", checkToken, userController.getUserProfileByEmail);
userRouter.post("/auth", userController.login);

export default userRouter;