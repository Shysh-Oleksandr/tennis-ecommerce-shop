import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IProduct from "./../../interfaces/product";
import tw from "tailwind-react-native-classnames";
import ProductImage from "../Products/ProductImage";

type Props = { item: IProduct; className?: any };

const ProductItem = ({ item, className }: Props) => {
  return (
    <View
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
    </View>
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
