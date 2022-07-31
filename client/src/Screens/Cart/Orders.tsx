import React from "react";
import { FlatList, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hooks";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Button from "../../shared/UI/Button";
import Loading from "../../shared/UI/Loading";
import IOrder from "./../../interfaces/order";
import OrderItem from "./OrderItem";

type Props = { navigation: any };

const Orders = ({ navigation }: Props) => {
  const { token, user } = useAppSelector((store) => store.user);
  const [orders, ordersLoading] = useFetchData<IOrder>(
    "GET",
    `${API_URL}/orders/${user._id}`,
    "orders",
    { Authorization: `Bearer ${token}` },
    user._id !== ""
  );

  if (ordersLoading) {
    return <Loading />;
  }

  if (user._id === "") {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800`}>
          Login to see your orders
        </Text>
        <View style={tw`w-full`}>
          <Button text="Login" onPress={() => navigation.navigate("User")} />
        </View>
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800`}>
          You haven't ordered anything yet
        </Text>
        <Text style={tw`text-xl text-center font-medium text-gray-400`}>
          Add orders to yours cart to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={tw`text-3xl font-bold my-4`}>Orders</Text>
      <View style={tw`w-full pb-20`}>
        <FlatList
          data={orders}
          renderItem={(item) => <OrderItem order={item.item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default Orders;
