import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import IProduct from "../../interfaces/product";
import ProductImage from "./ProductImage";
import { useAppDispatch } from "./../../app/hooks";
import AddProductBtn from "./AddProductBtn";
import CircleIndicator from "../../shared/UI/CircleIndicator";
import Banner from "../../shared/Banner";

type Props = {
  route: any;
};

const SEPARATOR = ",AND,";

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
      <ScrollView style={tw`mb-16 p-2`}>
        {item.images && item.images.length > 0 ? (
          <Banner
            bannerImages={item.images}
            className={{ marginBottom: -40 }}
          />
        ) : (
          <ProductImage
            image={item.image}
            styles={tw`w-64 h-48 mx-auto mb-4`}
          />
        )}
        <View style={tw`bg-white mx-2 rounded-lg shadow-lg pt-2 pb-0 mb-6`}>
          <View style={tw`justify-center items-center`}>
            <Text
              style={tw`text-2xl font-bold mb-2 px-2 border-b-2 border-gray-200 w-full text-center py-2`}
            >
              {item.name}
            </Text>
            <Text
              style={tw`text-xl font-semibold mb-2 px-2 border-b-2 border-gray-200 w-full text-center pb-1`}
            >
              Brand: {item.brand}
            </Text>
            <Text
              style={tw`text-xl font-semibold mb-2 px-2 border-b-2 border-gray-200 w-full text-center pb-1`}
            >
              Category: {item.category.name}
            </Text>
            <Text
              style={tw`text-xl font-semibold mb-2 px-2 border-b-2 border-gray-200 w-full text-center pb-1`}
            >
              Rating: {item.rating}/10
            </Text>
          </View>
          <View
            style={tw`border-b-2 border-gray-200 px-2 w-full text-center pb-1 flex-row items-center justify-center`}
          >
            <Text style={tw`text-center text-lg mr-2 font-semibold`}>
              {availabilityText}
            </Text>
            <CircleIndicator className={tw`${availablityColor}`} />
          </View>
          <View
            style={tw`${
              item.richDescription ? "border-b-2 border-gray-200 w-full" : ""
            } text-center pb-1 items-center justify-center my-2`}
          >
            <Text style={tw`text-base text-gray-600 font-medium px-2`}>
              {item.description}
            </Text>
          </View>
          {item.richDescription ? (
            <View style={tw`items-center justify-center my-2 text-center px-2`}>
              <Text style={tw`text-base text-gray-500`}>
                {item.richDescription}
              </Text>
            </View>
          ) : null}
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
