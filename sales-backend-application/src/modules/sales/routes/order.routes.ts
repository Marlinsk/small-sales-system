import { Router } from "express";
import checkToken from "../../../shared/config/auth/CheckToken";
import { OrderController } from "../controllers/OrderController";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/:id', checkToken, orderController.findById);
orderRouter.post('/create', checkToken, orderController.createOrder);

export default orderRouter;