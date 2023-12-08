import { Request, Response } from "express";

import { Products } from "../entities/Products";

import OrderService from "../services/OrderService";

import * as httpStatus from "../../../shared/constants/https-status";

class OrderController {
  async createOrder(request: Request, response: Response): Promise<Response> {
    try {
      const { authorization } = request.headers;
      const { transactionId, serviceId } =  request.headers;
      const { products }: { products: Array<Products> } = request.body;
      console.info(
        `Request to POST new order with data: ${JSON.stringify(
          request.body
        )} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
      const output = await OrderService.createOrder({
        products: products,
        user: request.user,
        token: String(authorization),
        transactionId: String(transactionId)
      });
      console.info(
        `Response to POST new order with data: ${JSON.stringify(
          output
        )} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
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
      const { transactionId, serviceId } =  request.headers;
      console.info(
        `Request to GET order by ID: ${id} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
      const output = await OrderService.findById(id);
      console.info(
        `Request to GET order by ID: ${id}: ${JSON.stringify(
          output
        )} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
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
      const { transactionId, serviceId } =  request.headers;
      console.info(
        `Request to GET all orders | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
      const output = await OrderService.findAll();
      console.info(
        `Request to GET all orders: ${JSON.stringify(
          output
        )} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
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
      const { transactionId, serviceId } =  request.headers;
      console.info(
        `Request to GET orders by productID: ${productId} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
      const output = await OrderService.findByProductId(productId);
      console.info(
        `Request to GET orders by productID: ${productId}: ${JSON.stringify(
          output
        )} | [transactionID: ${transactionId} | serviceID: ${serviceId}]`
      );
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