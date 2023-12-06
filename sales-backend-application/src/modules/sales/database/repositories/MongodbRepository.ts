import { Products } from "../../entities/Products";
import { Order } from "../../entities/Order";

import OrderSchema from "../model/OrderSchema";
import Exception from "../../../../shared/exceptions/Exception";
import OrderRepository from "../../interfaces/OrderRepository";

import * as httpStatus from "../../../../shared/constants/https-status";

export default class MongodbRepository implements OrderRepository {
  async save(
    data: Order | { products: Array<Products>; user: User; status: string }
  ): Promise<Order> {
    try {
      const order = await OrderSchema.create(data);
      return new Order(
        String(order._id),
        order.products,
        order.user,
        order.status,
        order.createdAt,
        order.updatedAt
      );
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await OrderSchema.find();
      const output = orders.map((data) => {
        return new Order(
          String(data._id),
          data.products,
          data.user,
          data.status,
          data.createdAt,
          data.updatedAt
        );
      });
      return output;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const order = await OrderSchema.findById(id);
      if (!order) {
        throw new Exception(
          "Query data failure.",
          httpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return new Order(
        String(order._id),
        order.products,
        order.user,
        order.status,
        order.createdAt,
        order.updatedAt
      );
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }

  async findByProductId(productId: string): Promise<Order[]> {
    try {
      const orders = await OrderSchema.find({ 
        "products.productId": Number(productId), 
      });
      const output = orders.map((data) => {
        return new Order(
          String(data._id),
          data.products,
          data.user,
          data.status,
          data.createdAt,
          data.updatedAt
        );
      });
      return output;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }
}
