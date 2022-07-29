import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchData } from "../../hooks/useFetchData";
import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import { API_URL } from "../../constants";
import tw from "tailwind-react-native-classnames";
import ProductItem from "./ProductItem";

type Props = {};

const Products = (props: Props) => {
  const [products, productsLoading] = useFetchData<IProduct>(
    "GET",
    `${API_URL}/products`,
    "products"
  );
  const [categories, categoriesLoading] = useFetchData<ICategory>(
    "GET",
    `${API_URL}/categories`,
    "categories"
  );
  const [productFIlter, setProductFilter] = useState([]);
  const [token, setToken] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res || "");
        })
        .catch((error) => console.log(error));
    }, [])
  );

  if (productsLoading) {
    return (
      <View style={tw`items-center justify-center flex-1`}>
        <ActivityIndicator size={70} color="blue" />
      </View>
    );
  }
  return (
    <View>
      {/* <FlatList
        ListEmptyComponent={
          <Text style={tw`text-2xl text-center`}>No products found</Text>
        }
        style={{ flexDirection: "column", flex: 1 }}
        data={products}
        renderItem={({ item }) => <ProductItem key={item._id} item={item} />}
        keyExtractor={(item) => item._id}
      /> */}
    </View>
  );
};

export default Products;
