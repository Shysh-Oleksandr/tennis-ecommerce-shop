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
};

const { width } = Dimensions.get("window");

const ProductList = ({ item }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ width: "50%" }}>
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <ProductCard item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
