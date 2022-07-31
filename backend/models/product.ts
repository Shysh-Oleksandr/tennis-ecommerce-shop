import mongoose, { Schema } from "mongoose";
import IProduct from "../interfaces/product";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  images: [{ type: String }],
  brand: { type: String, default: "" },
  countInStock: { type: Number, required: true, min: 0, max: 255 },
  price: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: { type: Number, default: 0, min: 0, max: 10 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  dateOrdered: { type: Date, default: Date.now },
  id: { type: String, unique: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
