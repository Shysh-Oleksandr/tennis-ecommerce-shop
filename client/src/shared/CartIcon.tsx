import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../app/hooks";
import tw from "tailwind-react-native-classnames";

type Props = {};

const CartIcon = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  return (
    <>
      {cartItems.length > 0 ? (
        <View
          style={tw`w-5 absolute bg-red-500 rounded-full shadow-lg -top-1 -right-2 flex-1 justify-center items-center content-center`}
        >
          <Text style={tw`text-sm font-bold text-white`}>
            {cartItems.length}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default CartIcon;
