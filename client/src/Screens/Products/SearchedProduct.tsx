import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IProduct from "./../../interfaces/product";
import tw from "tailwind-react-native-classnames";
import ProductImage from "./ProductImage";

type Props = { product: IProduct };

const SearchedProduct = ({ product }: Props) => {
  return (
    <View style={tw`flex-row items-center mb-3`}>
      <ProductImage image={product.image} styles={styles.image} />
      <View>
        <Text style={tw`text-xl font-bold`}>{product.name}</Text>
        <Text style={tw`text-lg text-gray-400`}>{product.description}</Text>
      </View>
    </View>
  );
};

export default SearchedProduct;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 10,
  },
});
