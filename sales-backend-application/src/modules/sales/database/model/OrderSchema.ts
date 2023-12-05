import { Schema, model } from "mongoose";
import { Products } from "../../entities/Products";
import { User } from "../../entities/User";

interface OrderModel extends Document {
  products: Array<Products>;
  user: User; 
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderModel>({
  products: {
    type: [
      { 
        productId: String, 
        quantity: Number 
      }
    ],
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});

export default model<OrderModel>("Order", OrderSchema);