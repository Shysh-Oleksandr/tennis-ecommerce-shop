import IProduct from "./product";

export default interface IOrderItem {
  quantity: number;
  product: IProduct;
}
