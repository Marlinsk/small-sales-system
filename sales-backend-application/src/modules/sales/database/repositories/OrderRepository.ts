import { Products } from "../../entities/Products";
import { Order } from "../../entities/Order";

import OrderSchema from "../model/OrderSchema";
import Exception from "../../../../shared/exceptions/Exception";

import * as httpStatus from "../../../../shared/constants/https-status";
import { DatabaseOutputMapper } from "../mappers/DatabaseOutputMapper";

class OrderRepository {
  async create(data: { products: Array<Products>; user: User; status: string }): Promise<Order> {
    try {
      const order = await OrderSchema.create(data);
      return DatabaseOutputMapper.toOrder(order);
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  }

  async save(data: Order): Promise<any> {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(
        data._id, { status: data.status }, { new: true }
      );
      if (!updatedOrder) {
        return new Exception(
          "The order was not found.", 
          httpStatus.INTERNAL_SERVER_ERROR
        ); 
      }
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await OrderSchema.find();
      const output = orders.map((data) => DatabaseOutputMapper.toOrder(data));
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
      return DatabaseOutputMapper.toOrder(order);
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }

  async findByProductId(productId: string): Promise<string[]> {
    try {
      const orders = await OrderSchema.find({ 
        "products.productId": Number(productId), 
      });
      return orders.map((order) => {
        return String(order._id);
      });
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }
}

export default new OrderRepository();