import IUser from "./user";
import IOrderItem from "./orderItem";

export default interface IOrder {
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status?: string;
  totalPrice: number;
  dateOrdered: number;
  user?: IUser;
  orderItems: IOrderItem[];
  _id: string;
}
