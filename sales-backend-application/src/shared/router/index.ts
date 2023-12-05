import { Router } from "express";
import orderRouter from "../../modules/sales/routes/order.routes";

const routes = Router();

routes.use('/api/order', orderRouter);

export default routes;