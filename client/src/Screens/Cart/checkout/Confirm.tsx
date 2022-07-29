import React from "react";
import { ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { clearCart } from "../../../features/cart/cartSlice";
import IOrder from "../../../interfaces/order";
import Button from "../../../shared/UI/Button";
import CartItem from "../CartItem";
import { useAppDispatch } from "./../../../app/hooks";

type Props = {
  route: any;
  navigation: any;
};

const Confirm = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const confirm: IOrder | undefined = route.params
    ? route.params.order.order
    : undefined;

  const confirmOrder = () => {
    setTimeout(() => {
      dispatch(clearCart());
      navigation.navigate("Cart");
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={tw`p-2 items-center pb-4`}>
      <Text style={tw`text-2xl text-center mt-3 font-bold`}>Confirm Order</Text>
      {confirm && (
        <View style={tw`mt-3 w-5/6`}>
          <View style={tw`shadow-lg bg-white mb-2`}>
            <Text style={tw`text-center p-3 text-xl font-bold bg-gray-100`}>
              Shipping to:
            </Text>
            <View>
              {confirm.shippingAddress1 ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Address:</Text>{" "}
                  {confirm.shippingAddress1}
                </Text>
              ) : null}
              {confirm.shippingAddress2 ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Address2:</Text>{" "}
                  {confirm.shippingAddress2}
                </Text>
              ) : null}
              {confirm.city ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>City:</Text> {confirm.city}
                </Text>
              ) : null}
              {confirm.zip ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Zip:</Text> {confirm.zip}
                </Text>
              ) : null}
              {confirm.country ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Country:</Text> {confirm.country}
                </Text>
              ) : null}
            </View>
            <Text style={tw`text-center p-3 text-xl font-bold bg-gray-100`}>
              Items:
            </Text>
            <View>
              {confirm.orderItems.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.product._id}
                    cartItem={cartItem}
                    imageClassName={tw`w-12 h-12`}
                  />
                );
              })}
            </View>
          </View>
          <Button text="Place Order" onPress={() => confirmOrder()} />
        </View>
      )}
    </ScrollView>
  );
};

export default Confirm;
