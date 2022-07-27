import axios from "axios";
import { Input } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/fetchData";
import Banner from "../../shared/Banner";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import IProduct from "./../../interfaces/product";
import ICategory from "./../../interfaces/category";
import CategoryFilter from "./CategoryFilter";
import SafeAreaView from "react-native-safe-area-view";

type Props = {};

const ProductContainer = (props: Props) => {
  const [filteredproducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useFetchData<IProduct>(
    "GET",
    `${API_URL}/products`,
    "products"
  );
  const [categories, setCategories] = useFetchData<ICategory>(
    "GET",
    `${API_URL}/categories`,
    "categories"
  );
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState(products);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const ListHeaderComponent = (
    <>
      <View>
        <Banner />
      </View>
      <View>
        <FlatList
          style={{ flexDirection: "row" }}
          data={categories}
          renderItem={({ item }) => (
            <CategoryFilter key={item.id} category={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView>
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
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ flexDirection: "column" }}
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductList key={item._id} item={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
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
