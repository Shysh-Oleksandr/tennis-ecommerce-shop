import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import IProduct from "../../interfaces/product";
import ProductImage from "./ProductImage";
import { useAppDispatch } from "./../../app/hooks";
import AddProductBtn from "./AddProductBtn";

type Props = {
  route: any;
};

const SingleProduct = ({ route }: Props) => {
  const [item, setItem] = useState<IProduct>(route.params.item);
  const [availability, setAvailability] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <View style={tw`relative h-full`}>
      <ScrollView style={tw`mb-20 p-2`}>
        <View style={tw`p-0 m-0`}>
          <ProductImage image={item.image} styles={tw`w-full h-44`} />
        </View>
        <View style={tw`mt-6 justify-center items-center`}>
          <Text style={tw`text-2xl font-bold mb-3`}>{item.name}</Text>
          <Text style={tw`text-xl font-bold mb-6`}>{item.brand}</Text>
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
