import { Request, Response } from "express";
import { container } from "tsyringe";

import * as httpStatus from "../../../shared/constants/https-status";
import OrderService from "../services/OrderService";
import { Products } from "../entities/Products";

export class OrderController {
  async createOrder(request: Request, response: Response): Promise<Response> {
    try {
      const { authorization } = request.headers;
      const { products }: { products: Array<Products> } = request.body;
      const service = container.resolve(OrderService);
      const output = await service.createOrder({
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
      const service = container.resolve(OrderService);
      const output = await service.findById(id);
      return response.status(output.status).json(output);
    } catch (error: any) {
      return response.json({
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
