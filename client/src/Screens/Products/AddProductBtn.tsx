import React from "react";
import { useAppSelector } from "../../app/hooks";
import IProduct from "./../../interfaces/product";
import { useAppDispatch } from "./../../app/hooks";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import Toast from "react-native-toast-message";
import Button from "./../../shared/UI/Button";
import tw from "tailwind-react-native-classnames";

type Props = { item: IProduct; className?: any };

const AddProductBtn = ({ item, className }: Props) => {
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
      text={isAdded ? "Remove" : "Add"}
      onPress={isAdded ? removeProduct : addProduct}
      textClassName={tw`text-lg`}
      className={[
        tw`${isAdded ? "bg-blue-900" : "bg-blue-500"} py-1`,
        className,
      ]}
    />
  );
};

export default AddProductBtn;
