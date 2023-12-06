import { Request, Response } from "express";

import { Products } from "../entities/Products";

import OrderService from "../services/OrderService";

import * as httpStatus from "../../../shared/constants/https-status";

class OrderController {
  async createOrder(request: Request, response: Response): Promise<Response> {
    try {
      const { authorization } = request.headers;
      const { products }: { products: Array<Products> } = request.body;
      const output = await OrderService.createOrder({
        products: products,
        user: request.user,
        token: String(authorization),
      });
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const output = await OrderService.findById(id);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const output = await OrderService.findAll();
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async findByProductId(request: Request, response: Response): Promise<Response> {
    try {
      const { productId } = request.params;
      const output = await OrderService.findByProductId(productId);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}

export default new OrderController();