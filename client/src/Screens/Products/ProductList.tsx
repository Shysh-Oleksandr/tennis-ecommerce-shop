import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import IProduct from "../../interfaces/product";
import ProductCard from "./ProductCard";

type Props = {
  item: IProduct;
  navigation: any;
};

const { width } = Dimensions.get("window");

const ProductList = ({ item, navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: "50%" }}
      onPress={() => navigation.navigate("Product Detail", { item: item })}
    >
      <View style={{ width: width / 2 }}>
        <ProductCard item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
