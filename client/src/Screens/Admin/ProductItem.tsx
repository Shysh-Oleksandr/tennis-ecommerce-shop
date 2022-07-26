import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import IProduct from "./../../interfaces/product";
import tw from "tailwind-react-native-classnames";
import ProductImage from "../Products/ProductImage";

type Props = { item: IProduct; className?: any; navigation: any };

const ProductItem = ({ item, className, navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Product Detail", { item: item })}
      style={[
        tw`flex-row w-full bg-white px-4 py-1 items-center shadow-lg`,
        className,
      ]}
    >
      <ProductImage image={item.image} styles={tw`w-8 h-8 rounded-full mr-4`} />
      <Text numberOfLines={1} style={styles.itemText}>
        {item.brand}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.name}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.category.name}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        $ {item.price}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    flexBasis: "23%",
    paddingHorizontal: 5,
  },
});
