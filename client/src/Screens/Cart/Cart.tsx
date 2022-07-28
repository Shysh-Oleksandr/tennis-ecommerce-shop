import React from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCart, removeFromCart } from "../../features/cart/cartSlice";
import IOrderItem from "../../interfaces/orderItem";
import CartItem from "./CartItem";

type Props = {
  navigation: any;
};

export function getTotalPrice(cartItems: IOrderItem[]): number {
  let total = 0;

  cartItems.forEach((item) => {
    return (total += item.product.price);
  });
  return total;
}

const Cart = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const total = getTotalPrice(cartItems);

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
      <View style={tw`w-full mb-16`}>
        <SwipeListView
          data={cartItems}
          renderItem={(item) => <CartItem cartItem={item.item} />}
          renderHiddenItem={(item) => {
            return (
              <View style={tw`flex-1 justify-end flex-row `}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={tw`bg-red-500 justify-center items-end pr-6 h-16 mt-2 w-full`}
                  onPress={() => dispatch(removeFromCart(item.item))}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            );
          }}
          disableRightSwipe={true}
          keyExtractor={(item) => item.product._id}
          previewOpenDelay={3000}
          friction={1000}
          tension={40}
          leftOpenValue={75}
          stopLeftSwipe={75}
          rightOpenValue={-75}
        />
        {/* {cartItems.map((cartItem, index) => {
          return (
            <CartItem key={cartItem.product._id + index} cartItem={cartItem} />
          );
        })} */}
      </View>
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
