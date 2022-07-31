import { View, Text } from "react-native";
import React, { useState } from "react";
import IOrderItem from "./../../interfaces/orderItem";
import ProductImage from "../Products/ProductImage";
import tw from "tailwind-react-native-classnames";
import NumericInput from "react-native-numeric-input";
import { useAppDispatch } from "./../../app/hooks";
import { changeProductQuantity } from "../../features/cart/cartSlice";

type Props = {
  cartItem: IOrderItem;
  imageClassName?: any;
  isConfirm?: boolean;
};

const CartItem = ({ cartItem, imageClassName, isConfirm }: Props) => {
  const product = cartItem.product;
  const dispatch = useAppDispatch();

  return (
    <View
      style={tw`items-center bg-white p-2 shadow-lg justify-between w-full px-4 flex-row`}
    >
      <View style={tw`flex-row items-center justify-between flex-1`}>
        <View style={tw`flex-row items-center flex-1`}>
          <ProductImage
            image={product.image}
            styles={[tw`w-14 h-14 rounded-full mr-4`, imageClassName]}
          />
          <Text
            numberOfLines={1}
            style={tw`text-xl font-semibold ${isConfirm ? "w-3/5" : "w-2/3"}`}
          >
            {product.name}
          </Text>
        </View>
        {isConfirm ? (
          <Text style={tw`mr-4 text-base`}>x{cartItem.quantity}</Text>
        ) : (
          <NumericInput
            minValue={1}
            maxValue={999}
            totalWidth={70}
            totalHeight={40}
            containerStyle={tw`mx-2`}
            type="up-down"
            value={cartItem.quantity}
            onChange={(value) =>
              dispatch(
                changeProductQuantity({ id: product._id, quantity: value })
              )
            }
          />
        )}
      </View>
      <View>
        <Text style={tw`text-base text-red-400 font-medium text-right`}>
          $ {product.price}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
