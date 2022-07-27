import axios from "axios";
import { Input } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { API_URL } from "../../constants";
import IProduct from "../../interfaces/product";
import Banner from "../../shared/Banner";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

type Props = {};

const ProductContainer = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredproducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [focus, setFocus] = useState(false);

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
        setFilteredProducts(products);
      } else {
        console.log("Can't get products");
      }
    } catch (error) {
      alert(error);
      console.log("Catch: " + error);
    }
  }

  const searchProduct = (text: string) => {
    setFilteredProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <Input
          onChangeText={(text) => searchProduct(text)}
          style={styles.searchInput}
          placeholder="Search"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {focus && (
          <Icon
            name="close"
            style={{ position: "absolute", right: 6, top: "20%", fontSize: 25 }}
            onPress={onBlur}
          />
        )}
      </View>
      {focus ? (
        <SearchedProducts filteredProducts={filteredproducts} />
      ) : (
        <View>
          <View>
            <Banner />
          </View>
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            style={{ flexDirection: "column", flexWrap: "wrap" }}
            numColumns={2}
            data={products}
            renderItem={({ item }) => (
              <ProductList key={item._id} item={item} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "lightgray",
  },
  searchContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    position: "relative",
  },
});
