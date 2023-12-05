import { Order } from "../entities/Order";
import { Products } from "../entities/Products";

export default interface OrderRepository {
  save(data: Order | { products: Array<Products>; user: User; status: string }): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
}