import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import IProduct from "../../interfaces/product";
import ProductList from "./ProductList";
import { Input } from "native-base";
import { Icon } from "native-base";

type Props = {};

const ProductContainer = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL}/products`,
      });

      if (response.status === 200 || response.status === 304) {
        let products = response.data.products as IProduct[];
        setProducts(products);
      } else {
        console.log("Can't get products");
      }
    } catch (error) {
      alert(error);
      console.log("Catch: " + error);
    }
  }

  return (
    <View>
      <View>
        <Icon name="md-search" />
        <Input placeholder="Search" />
      </View>
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ flexDirection: "column", flexWrap: "wrap" }}
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductList key={item._id} item={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});
