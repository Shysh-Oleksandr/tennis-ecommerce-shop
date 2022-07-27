import { Input } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Icon from "react-native-vector-icons/AntDesign";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Banner from "../../shared/Banner";
import ICategory from "./../../interfaces/category";
import IProduct from "./../../interfaces/product";
import CategoryFilters from "./CategoryFilters";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

type Props = {};

const ProductContainer = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [initialState, setInitialState] = useState(products);
  const [focus, setFocus] = useState(false);
  const isCategoryChosen: boolean = activeCategory.toLowerCase() === "all";

  useEffect(() => {
    setFilteredProducts(products);
    setCategoryProducts(products);
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

  // Categories
  const filterProductsByCategory = () => {
    if (activeCategory.toLowerCase() === "all") {
      setCategoryProducts(initialState);
    } else {
      setCategoryProducts(
        products.filter((product) => product.category.name === activeCategory)
      );
    }
  };

  useEffect(() => {
    filterProductsByCategory();
  }, [activeCategory]);

  const ListHeaderComponent = (
    <>
      <View>
        <Banner />
      </View>

      <CategoryFilters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
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
        <SearchedProducts filteredProducts={filteredProducts} />
      ) : (
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ flexDirection: "column", marginBottom: 35 }}
          numColumns={2}
          data={isCategoryChosen ? products : categoryProducts}
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
