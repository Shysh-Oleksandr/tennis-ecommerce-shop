import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
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
    height: 240,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
    zIndex: 40,
  },
  image: {
    width: width / 2 - 20 - 20,
    height: 135,
    backgroundColor: "transparent",
    position: "absolute",
    top: -30,
  },
  card: {
    marginBottom: 10,
    height: 100,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
