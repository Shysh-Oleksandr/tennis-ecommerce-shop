import { Document } from "mongoose";
import IProduct from "./product";

export default interface IOrderItem extends Document {
  quantity: number;
  product: IProduct;
}
