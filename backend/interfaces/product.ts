import { Document } from "mongoose";
import ICategory from "./category";

export default interface IProduct extends Document {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  countInStock: number;
  price: number;
  category: ICategory;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateOrdered: number;
}
