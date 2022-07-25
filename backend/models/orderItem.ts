import mongoose, { Schema } from "mongoose";
import IOrderItem from "../interfaces/orderItem";

const OrderSchema: Schema = new Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  id: { type: String, unique: true },
});

export default mongoose.model<IOrderItem>("OrderItem", OrderSchema);
