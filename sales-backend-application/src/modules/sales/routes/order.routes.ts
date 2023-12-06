import { Router } from "express";

import { OrderController } from "../controllers/OrderController";

import checkToken from "../../../shared/config/auth/CheckToken";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/order/:id', checkToken, orderController.findById);
orderRouter.get('/orders', checkToken, orderController.findAll);
orderRouter.get('/orders/product/:productId', checkToken, orderController.findByProductId);
orderRouter.post('/order/create', checkToken, orderController.createOrder);

export default orderRouter;