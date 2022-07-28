import IUser from "./user";
import IOrderItem from "./orderItem";

export default interface IOrder {
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: number;
  status?: string;
  totalPrice: number;
  dateCreated: Date;
  user?: IUser;
  orderItems: IOrderItem[];
  _id: string;
}
