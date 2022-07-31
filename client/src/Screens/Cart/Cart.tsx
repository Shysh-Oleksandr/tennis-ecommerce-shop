import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCart, removeFromCart } from "../../features/cart/cartSlice";
import IOrderItem from "../../interfaces/orderItem";
import IProduct from "../../interfaces/product";
import CartItem from "./CartItem";
import Toast from "react-native-toast-message";
import Button from "../../shared/UI/Button";

type Props = {
  navigation: any;
};

export function getTotalPrice(cartItems: IOrderItem[]): number {
  let total = 0;

  cartItems.forEach((item) => {
    return (total += item.product.price * item.quantity);
  });
  return total;
}

const Cart = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState(getTotalPrice(cartItems));

  useEffect(() => {
    setTotal(getTotalPrice(cartItems));
  }, [cartItems]);

  const removeProduct = (item: IProduct) => {
    dispatch(removeFromCart(item._id));
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `${item.name} was removed from the Cart`,
    });
  };
  const clearAllProducts = () => {
    dispatch(clearCart());
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `All products were removed from the Cart`,
    });
  };

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
          renderItem={(item) => (
            <CartItem cartItem={item.item} imageClassName={tw`w-14 h-14`} />
          )}
          renderHiddenItem={(item) => {
            return (
              <View style={tw`flex-1 justify-start flex-row `}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={tw`bg-red-500 justify-center items-start pl-6 h-16 mt-2 w-full`}
                  onPress={() => removeProduct(item.item.product)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            );
          }}
          disableRightSwipe={true}
          previewOpenDelay={3000}
          friction={1000}
          tension={40}
          leftOpenValue={-75}
          stopLeftSwipe={-75}
          rightOpenValue={75}
          keyExtractor={(item) => item.product._id}
        />
      </View>
      <View
        style={tw`absolute bottom-0 z-10 left-0 w-full bg-white px-4 py-4 rounded-md shadow-lg flex-row items-center justify-between`}
      >
        <View>
          <Text style={tw`text-xl font-bold`}>
            Total: <Text style={tw`text-red-400`}>$ {total}</Text>
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <View style={tw`mr-2`}>
            <Button
              onPress={clearAllProducts}
              text="Clear"
              className={tw`py-1 bg-blue-500`}
              textClassName={tw`text-lg`}
            />
          </View>
          <View>
            <Button
              text="Checkout"
              className={tw`py-1 bg-blue-800`}
              textClassName={tw`text-lg`}
              onPress={() => props.navigation.navigate("Checkout")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;
