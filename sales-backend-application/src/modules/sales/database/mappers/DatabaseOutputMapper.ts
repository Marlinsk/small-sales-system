import { Types } from "mongoose";
import { Order } from "../../entities/Order";
import { Products } from "../../entities/Products";
import { User } from "../../entities/User";

export class DatabaseOutputMapper {
  public static toOrder(order: {
    _id: Types.ObjectId;
    products: Array<Products>;
    user: User;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): Order {
    return new Order(
      String(order._id),
      order.products,
      order.user,
      order.status,
      order.createdAt,
      order.updatedAt
    );
  }
}