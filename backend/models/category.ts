import mongoose, { Schema } from "mongoose";
import ICategory from "../interfaces/category";

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  image: { type: String },
  id: { type: String, unique: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
