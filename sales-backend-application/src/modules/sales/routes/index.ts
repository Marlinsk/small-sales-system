import { Router } from "express";

import OrderController from "../controllers/OrderController";

import checkToken from "../../../shared/config/auth/CheckToken";

const router = Router();

router.get('/api/order/:id', checkToken, OrderController.findById);
router.get('/api/orders', checkToken, OrderController.findAll);
router.get('/api/orders/product/:productId', checkToken, OrderController.findByProductId);
router.post('/api/order/create', checkToken, OrderController.createOrder);

export default router;