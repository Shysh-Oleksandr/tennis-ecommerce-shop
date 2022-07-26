import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import IProduct from "../../interfaces/product";
import { EMULATOR_API } from "../../constants";

type Props = {
  item: IProduct;
};

const { width } = Dimensions.get("window");

const ProductCard = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: item.image.replace("localhost", EMULATOR_API) }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {item.name.length > 15
          ? item.name.substring(0, 15 - 3) + "..."
          : item.name}
      </Text>
      <Text style={styles.price}>${item.price}</Text>

      {item.countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button title="Add" color="green" />
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
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
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
