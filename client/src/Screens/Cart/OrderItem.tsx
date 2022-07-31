import axios from "axios";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hooks";
import { API_URL } from "../../constants";
import Button from "../../shared/UI/Button";
import CircleIndicator from "../../shared/UI/CircleIndicator";
import IOrder from "./../../interfaces/order";

type Props = {
  order: IOrder;
};

enum Status {
  Pending = "Pending",
  Processing = "Processing",
  Delivered = "Delivered",
  Canceled = "Canceled",
}

const OrderItem = ({ order }: Props) => {
  const [status, setStatus] = useState<Status>(Status.Pending);
  const { token } = useAppSelector((store) => store.user);
  const isCanceled = status === Status.Canceled;
  const [deleting, setDeleting] = useState(false);

  async function deleteOrder() {
    setDeleting(true);
    try {
      if (!order) throw new Error();
      const response = await axios({
        method: "DELETE",
        url: `${API_URL}/orders/${order._id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 202 || response.status === 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `Order №${order._id} has been canceled`,
        });
        setStatus(Status.Canceled);
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
    } finally {
      setDeleting(false);
    }
  }

  const statusColor =
    status === Status.Pending
      ? "bg-green-400"
      : status === Status.Processing
      ? "bg-yellow-400"
      : "bg-red-500";

  const removeOrder = async () => {
    await deleteOrder();
  };

  return (
    <View style={tw`bg-white px-4 py-3 shadow-lg rounded-md my-2 mx-6`}>
      <Text style={tw`text-sm text-gray-400`}>№{order._id}</Text>
      <View style={tw`flex-row items-center border-b-2 border-gray-100`}>
        <Text style={tw`text-base text-gray-800 mr-1`}>
          <Text style={tw`font-semibold`}>Status:</Text> {status}
        </Text>
        <CircleIndicator className={tw`${statusColor} h-5 w-5`} />
      </View>
      <Text
        style={tw`text-base text-gray-800  w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>Street:</Text> {order.shippingAddress1}
      </Text>
      {order.shippingAddress2 ? (
        <Text
          style={tw`text-base text-gray-800  w-full border-b-2 border-gray-100`}
        >
          <Text style={tw`font-semibold`}>Street 2:</Text>{" "}
          {order.shippingAddress2}
        </Text>
      ) : null}
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>City:</Text> {order.city}
      </Text>
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>Country:</Text> {order.country}
      </Text>
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>Zip:</Text> {order.zip}
      </Text>
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>Phone:</Text> {order.phone}
      </Text>
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100`}
      >
        <Text style={tw`font-semibold`}>Date:</Text>{" "}
        {new Date(order.dateOrdered).toLocaleDateString()}
      </Text>
      <Text style={tw`text-base font-semibold text-gray-800`}>Products:</Text>
      <View style={[tw`items-center flex-row mb-2`, { flexWrap: "wrap" }]}>
        {order.orderItems.map((orderItem) => {
          return (
            <View
              key={orderItem.product._id}
              style={tw`items-center justify-between flex-row w-full border-2 border-gray-200 py-1 px-2`}
            >
              <Text
                numberOfLines={1}
                style={tw`text-base font-semibold mr-2 w-2/3`}
              >
                {orderItem.product.name}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base`}>x{orderItem.quantity}</Text>
                <Text style={tw`text-base ml-2 text-red-400`}>
                  $ {orderItem.product.price * orderItem.quantity}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={tw`items-center justify-between flex-row`}>
        <Button
          textClassName={tw`text-xl`}
          text="Cancel"
          disabled={isCanceled || deleting}
          onPress={() => removeOrder()}
          className={tw`w-1/2 py-1 ${isCanceled ? "bg-red-900" : "bg-red-600"}`}
        />
        <Text style={tw`text-lg font-semibold text-right`}>
          Total:{" "}
          <Text style={tw`text-red-400`}>$ {order.totalPrice.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
