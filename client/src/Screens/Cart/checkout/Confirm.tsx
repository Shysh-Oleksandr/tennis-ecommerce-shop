import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import IOrder from "../../../interfaces/order";

type Props = {
  route: any;
};

const Confirm = ({ route }: Props) => {
  const confirm: IOrder | undefined = route.params
    ? route.params.order.order
    : undefined;

  return (
    <ScrollView contentContainerStyle={tw`h-full p-2 items-center`}>
      <Text style={tw`text-2xl text-center mt-3 font-bold`}>Confirm Order</Text>
      {confirm && (
        <View style={tw`shadow-lg bg-white mt-3 w-4/5`}>
          <Text style={tw`text-center p-3 text-xl font-bold bg-gray-100`}>
            Shipping to:
          </Text>
          <View>
            {confirm.shippingAddress1 ? (
              <Text
                style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
              >
                Address: {confirm.shippingAddress1}
              </Text>
            ) : null}
            {confirm.shippingAddress2 ? (
              <Text
                style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
              >
                Address2: {confirm.shippingAddress2}
              </Text>
            ) : null}
            {confirm.city ? (
              <Text
                style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
              >
                City: {confirm.city}
              </Text>
            ) : null}
            {confirm.zip ? (
              <Text
                style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
              >
                Zip: {confirm.zip}
              </Text>
            ) : null}
            {confirm.country ? (
              <Text
                style={tw`text-lg font-medium px-8 py-3 bg-white shadow-lg`}
              >
                Country: {confirm.country}
              </Text>
            ) : null}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Confirm;
