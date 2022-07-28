import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import tw from "tailwind-react-native-classnames";
import ProductImage from "../Products/ProductImage";
import { clearCart } from "../../features/cart/cartSlice";

type Props = {
  navigation: any;
};

const Cart = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  let total = 0;

  cartItems.forEach((item) => {
    return (total += item.product.price);
  });

  if (cartItems.length === 0) {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800`}>
          The cart is empty
        </Text>
        <Text style={tw`text-xl text-center font-medium text-gray-400`}>
          Add products to yours cart to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={tw`text-3xl font-bold my-4`}>Cart</Text>
      <ScrollView style={tw`w-full mb-16`}>
        {cartItems.map((cartItem, index) => {
          return (
            <View
              key={cartItem.product._id + index}
              style={tw`items-center bg-white p-2 rounded-md my-1 shadow-lg justify-between w-full px-4 flex-row`}
            >
              <View style={tw`flex-row items-center`}>
                <ProductImage
                  image={cartItem.product.image}
                  styles={tw`w-14 h-14 rounded-full mr-4`}
                />
                <Text style={tw`text-xl font-semibold`}>
                  {cartItem.product.name}
                </Text>
              </View>
              <View>
                <Text style={tw`text-base text-red-400 font-medium`}>
                  ${cartItem.product.price}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={tw`absolute bottom-0 z-10 left-0 w-full bg-white px-4 py-4 rounded-md shadow-lg flex-row items-center justify-between`}
      >
        <View>
          <Text style={tw`text-xl font-bold`}>
            Total: <Text style={tw`text-red-400`}>${total}</Text>
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <View style={tw`mr-2`}>
            <Button onPress={() => dispatch(clearCart())} title="Clear" />
          </View>
          <View>
            <Button
              title="Checkout"
              onPress={() => props.navigation.navigate("Checkout")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;
