import { View, Text, Button } from "react-native";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import IProduct from "./../../interfaces/product";
import { useAppDispatch } from "./../../app/hooks";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import Toast from "react-native-toast-message";

type Props = { item: IProduct };

const AddProductBtn = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((store) => store.cart);
  const isAdded = cartItems.map((item) => item.product._id).includes(item._id);

  const addProduct = () => {
    dispatch(addToCart({ quantity: 1, product: item }));
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `${item.name} added to the Cart`,
      text2: "Go to your cart to complete order",
    });
  };
  const removeProduct = () => {
    dispatch(removeFromCart(item._id));
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `${item.name} was removed from the Cart`,
    });
  };
  return (
    <Button
      color={isAdded ? "gray" : "blue"}
      title={isAdded ? "Remove" : "Add"}
      onPress={isAdded ? removeProduct : addProduct}
    />
  );
};

export default AddProductBtn;
