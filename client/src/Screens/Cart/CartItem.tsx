import { View, Text } from "react-native";
import React, { useState } from "react";
import IOrderItem from "./../../interfaces/orderItem";
import ProductImage from "../Products/ProductImage";
import tw from "tailwind-react-native-classnames";

type Props = {
  cartItem: IOrderItem;
  imageClassName?: any;
};

const CartItem = ({ cartItem, imageClassName }: Props) => {
  const product = cartItem.product;
  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <View
      style={tw`items-center bg-white p-2  shadow-lg justify-between w-full px-4 flex-row`}
    >
      <View style={tw`flex-row items-center`}>
        <ProductImage
          image={cartItem.product.image}
          styles={[tw`w-14 h-14 rounded-full mr-4`, imageClassName]}
        />
        <Text style={tw`text-xl font-semibold`}>{cartItem.product.name}</Text>
      </View>
      <View>
        <Text style={tw`text-base text-red-400 font-medium`}>
          $ {cartItem.product.price}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
