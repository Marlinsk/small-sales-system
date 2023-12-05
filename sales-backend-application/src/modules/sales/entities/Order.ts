import { Products } from "./Products";
import { User } from "./User";

export class Order {
  _id: string; 
  products: Array<Products>; 
  user: User; 
  status: string; 
  createdAt: Date; 
  updatedAt: Date;

  constructor(
    _id: string, 
    products: Array<Products>, 
    user: User, 
    status: string, 
    createdAt: Date, 
    updatedAt: Date
  ) { 
    this._id = _id;
    this.products = products;
    this.user = user;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
