import { View, Text, Button } from "react-native";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import IProduct from "./../../interfaces/product";
import { useAppDispatch } from "./../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";

type Props = { item: IProduct };

const AddProductBtn = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((store) => store.cart);
  const isAdded = cartItems.map((item) => item.product._id).includes(item._id);
  return (
    <Button
      title={isAdded ? "Added" : "Add"}
      disabled={isAdded}
      onPress={() => dispatch(addToCart({ quantity: 1, product: item }))}
    />
  );
};

export default AddProductBtn;
