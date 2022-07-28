import React from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import IProduct from "../../interfaces/product";
import AddProductBtn from "./AddProductBtn";
import ProductImage from "./ProductImage";

type Props = {
  item: IProduct;
};

const { width } = Dimensions.get("window");

const ProductCard = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <ProductImage image={item.image} styles={styles.image} />
      <View style={styles.card} />
      <Text style={styles.title}>
        {item.name.length > 15
          ? item.name.substring(0, 15 - 3) + "..."
          : item.name}
      </Text>
      <Text style={styles.price}>$ {item.price}</Text>

      {item.countInStock > 0 ? (
        <View style={{ marginBottom: 40, marginTop: 10 }}>
          <AddProductBtn item={item} />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 20,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
