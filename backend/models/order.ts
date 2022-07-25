import mongoose, { Schema } from "mongoose";
import IOrder from "../interfaces/order";

const OrderSchema: Schema = new Schema({
  shippingAddress1: { type: String, required: true },
  shippingAddress2: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: true },
  status: { type: String, required: true, default: "Pending" },
  totalPrice: { type: Number },
  dateOrdered: { type: Date, default: Date.now },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  id: { type: String, unique: true },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
