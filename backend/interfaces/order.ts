import { Document } from "mongoose";
import ICategory from "./category";
import IUser from "./user";
import IOrderItem from "./orderItem";

export default interface IOrder extends Document {
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: number;
  status: string;
  totalPrice: number;
  dateOrdered: number;
  user: IUser;
  orderItems: IOrderItem[];
}
