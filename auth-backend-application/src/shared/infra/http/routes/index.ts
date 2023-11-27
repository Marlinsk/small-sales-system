import { Router } from "express";

import userRouter from "@infra/http/routes/user.route";

const routes = Router();

routes.use('/api/user', userRouter);

export default routes;