import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import IProduct from "../../interfaces/product";
import ProductImage from "./ProductImage";
import { useAppDispatch } from "./../../app/hooks";
import AddProductBtn from "./AddProductBtn";
import CircleIndicator from "../../shared/UI/CircleIndicator";

type Props = {
  route: any;
};

enum Availability {
  Unavailable,
  Limited,
  Available,
}

const SingleProduct = ({ route }: Props) => {
  const [item, setItem] = useState<IProduct>(route.params.item);
  const [availability, setAvailability] = useState<Availability>(
    Availability.Available
  );
  const [availabilityText, setAvailabilityText] = useState<string>("");
  const availablityColor =
    availability === Availability.Available
      ? "bg-green-400"
      : availability === Availability.Limited
      ? "bg-yellow-400"
      : "bg-red-500";

  useEffect(() => {
    if (item.countInStock === 0) {
      setAvailability(Availability.Unavailable);
      setAvailabilityText("Unavailable");
    } else if (item.countInStock <= 5) {
      setAvailability(Availability.Limited);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(Availability.Available);
      setAvailabilityText("Available");
    }
  }, []);

  return (
    <View style={tw`relative h-full`}>
      <ScrollView style={tw`mb-20 p-2`}>
        <View style={tw`p-0 m-0`}>
          <ProductImage image={item.image} styles={tw`w-full h-44`} />
        </View>
        <View style={tw`mt-6 justify-center items-center`}>
          <Text style={tw`text-2xl font-bold mb-3`}>{item.name}</Text>
          <Text style={tw`text-xl font-semibold mb-4`}>{item.brand}</Text>
        </View>
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`text-center text-lg mr-2`}>
            Availability: {availabilityText}
          </Text>
          <CircleIndicator className={tw`${availablityColor}`} />
        </View>
        <View style={tw`items-center justify-center my-2`}>
          <Text style={tw`text-base text-gray-500`}>{item.description}</Text>
        </View>
      </ScrollView>
      <View
        style={tw`flex-row absolute bottom-0 left-0 w-full bg-white justify-between items-center`}
      >
        <View>
          <Text style={tw`text-2xl m-4 text-red-500 font-semibold`}>
            $ {item.price}
          </Text>
        </View>
        <View style={tw`mr-4`}>
          <AddProductBtn item={item} />
        </View>
      </View>
    </View>
  );
};

export default SingleProduct;
