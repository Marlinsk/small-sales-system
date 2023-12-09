import { Router } from "express";

import OrderController from "../controllers/OrderController";

import checkToken from "../../../shared/config/auth/CheckToken";

const router = Router();

router.get('/api/order/:id', checkToken, async (request, response) => { 
  await OrderController.findById(request, response); 
});

router.get('/api/orders', checkToken, async (request, response) => { 
  await OrderController.findAll(request, response); 
});

router.get('/api/orders/product/:productId', checkToken, async (request, response) => { 
  await OrderController.findByProductId(request, response); 
});

router.post('/api/order/create', checkToken, async (request, response) => {
  await OrderController.createOrder(request, response);
});

export default router;