import { injectable, inject } from "tsyringe";

import { Order } from "../entities/Order";
import { Products } from "../entities/Products";
import { sendMessageToProductStockUpdateQueue } from "../../product/rabbitmq/ProductStockUpdateSender";
import { PENDING } from "../constants/order-status";

import Exception from "../../../shared/exceptions/Exception";
import OrderRepository from "../interfaces/OrderRepository";
import ProductClient from "../../product/client/ProductClient";

import * as httpStatus from "../../../shared/constants/https-status";

@injectable()
export default class OrderService {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(request: {
    products: Array<Products>;
    user: User;
    token: string;
  }): Promise<
    | {
        status: number;
        order: Order;
        message?: undefined;
      }
    | {
        status: any;
        message: any;
        order?: undefined;
      }
  > {
    try {
      this.validateOrderData(request);
      const order = {
        products: request.products,
        user: request.user,
        status: PENDING,
      };
      await this.validateProductStock(order, request.token);
      const newOrder = await this.orderRepository.save(order);
      this.sendMessage(newOrder);
      return {
        status: httpStatus.SUCCESS,
        order: newOrder,
      };
    } catch (error: any) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  sendMessage(order: Order): void {
    const message = {
      salesId: order._id,
      products: order.products,
    };
    sendMessageToProductStockUpdateQueue(message);
  }

  validateOrderData(data: { products: Array<Products>; user: User }): void {
    if (!data || !data.products) {
      throw new Exception(
        "The products must be informed.",
        httpStatus.BAD_REQUEST
      );
    }
  }

  async validateProductStock(
    order: { products: Array<Products> },
    token: string
  ): Promise<void> {
    let stockIsOK = await ProductClient.checkProductStock(
      order.products,
      token
    );
    if (!stockIsOK) {
      throw new Exception(
        "The stock is out for products.",
        httpStatus.BAD_REQUEST
      );
    }
  }

  async updateOrder(orderMessage: string): Promise<void> {
    const order: { salesId: string; status: string } = JSON.parse(
      String(orderMessage)
    );
    try {
      if (order.salesId && order.status) {
        let existingOrder = await this.orderRepository.findById(order.salesId);
        if (existingOrder && order.status !== existingOrder.status) {
          existingOrder.status = order.status;
          await this.orderRepository.save(existingOrder);
        }
      } else {
        console.warn("The order message was not complete.");
      }
    } catch (error: any) {
      console.error("Could not parse order message from queue.");
      console.error(error.message);
    }
  }

  async findById(id: string): Promise<
    | {
        status: number;
        order: Order;
        message?: undefined;
      }
    | {
        status: any;
        message: any;
        order?: undefined;
      }
  > {
    try {
      this.validateInformedId(id);
      const existingOrder = await this.orderRepository.findById(id);
      if (!existingOrder) {
        throw new Exception(
          "The order was not found.",
          httpStatus.NOT_FOUND
        )
      }
      return {
        status: httpStatus.SUCCESS,
        order: existingOrder,
      };
    } catch (error: any) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validateInformedId(id: string): void {
    if (!id) {
      throw new Exception(
        "The order ID must be informed.",
        httpStatus.BAD_REQUEST
      );
    }
  }
}
