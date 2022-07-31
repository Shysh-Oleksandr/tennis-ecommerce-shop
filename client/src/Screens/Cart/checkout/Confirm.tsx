import axios from "axios";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import tw from "tailwind-react-native-classnames";
import { API_URL } from "../../../constants";
import { clearCart } from "../../../features/cart/cartSlice";
import IOrder from "../../../interfaces/order";
import Button from "../../../shared/UI/Button";
import ErrorText from "../../../shared/UI/ErrorText";
import CartItem from "../CartItem";
import { useAppDispatch, useAppSelector } from "./../../../app/hooks";
import { getTotalPrice } from "./../Cart";

type Props = {
  route: any;
  navigation: any;
};

const Confirm = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((store) => store.user);
  const { cartItems } = useAppSelector((store) => store.cart);
  const [error, setError] = useState("");
  const order: IOrder | undefined = route.params
    ? route.params.order.order
    : undefined;

  const totalPrice = getTotalPrice(cartItems);

  async function createNewOrder() {
    try {
      if (!order) throw new Error();
      const response = await axios({
        method: "POST",
        url: `${API_URL}/orders/create`,
        data: {
          shippingAddress1: order.shippingAddress1,
          shippingAddress2: order.shippingAddress2,
          city: order.city,
          zip: order.zip,
          country: order.country,
          phone: order.phone,
          orderItems: order.orderItems,
          user: user._id,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Order Completed",
        });
        setTimeout(() => {
          dispatch(clearCart());
          navigation.navigate("Your Orders");
        }, 500);
      } else {
        throw new Error();
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please, try again",
      });
      console.log("Catch: " + error);
    }
  }

  const confirmOrder = async () => {
    if (
      !order?.phone ||
      order?.phone.toString().length < 9 ||
      !order?.shippingAddress1 ||
      !order?.city ||
      !order?.country ||
      !order?.zip
    ) {
      setError("Please provide all the necessary information.");
      return;
    } else {
      setError("");
    }
    createNewOrder();
  };

  return (
    <ScrollView contentContainerStyle={tw`p-2 items-center pb-4`}>
      <Text style={tw`text-2xl text-center mt-3 font-bold`}>Confirm Order</Text>
      {order ? (
        <View style={tw`mt-3 w-5/6`}>
          <View style={tw`shadow-lg bg-white mb-2`}>
            <Text style={tw`text-center p-3 text-xl font-bold bg-gray-100`}>
              Shipping to:
            </Text>
            <View>
              {order.shippingAddress1 ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Address:</Text>{" "}
                  {order.shippingAddress1}
                </Text>
              ) : null}
              {order.shippingAddress2 ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Address2:</Text>{" "}
                  {order.shippingAddress2}
                </Text>
              ) : null}
              {order.city ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>City:</Text> {order.city}
                </Text>
              ) : null}
              {order.phone ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Phone:</Text> {order.phone}
                </Text>
              ) : null}
              {order.zip ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Zip:</Text> {order.zip}
                </Text>
              ) : null}
              {order.country ? (
                <Text
                  style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
                >
                  <Text style={tw`font-bold`}>Country:</Text> {order.country}
                </Text>
              ) : null}
            </View>
            <Text style={tw`text-center p-3 text-xl font-bold bg-gray-100`}>
              Items:
            </Text>
            <View>
              {order.orderItems.map((cartItem) => {
                return (
                  <CartItem
                    isConfirm={true}
                    key={cartItem.product._id}
                    cartItem={cartItem}
                    imageClassName={tw`w-12 h-12`}
                  />
                );
              })}
              <View
                style={tw`items-center justify-between px-4 flex-row bg-white border-t-2 border-gray-200`}
              >
                <Text style={tw`text-2xl font-semibold py-3`}>Total:</Text>
                <Text style={tw`text-red-400 text-2xl font-semibold`}>
                  $ {totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <ErrorText error={error} />
          <Button
            text="Place Order"
            onPress={() => confirmOrder()}
            className={tw`my-2`}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Confirm;
