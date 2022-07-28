import { Input } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Banner from "../../shared/Banner";
import ICategory from "./../../interfaces/category";
import IProduct from "./../../interfaces/product";
import CategoryFilters from "./CategoryFilters";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

const ProductContainer = (props: any) => {
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
  const productsData: IProduct[] = isCategoryChosen
    ? products
    : categoryProducts;

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
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Input
          onChangeText={(text) => searchProduct(text)}
          style={styles.searchInput}
          placeholder="Search"
          onFocus={onFocus}
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
        <SearchedProducts
          navigation={props.navigation}
          filteredProducts={filteredProducts}
        />
      ) : (
        <FlatList
          ListEmptyComponent={
            <Text style={tw`text-2xl text-center`}>No products found</Text>
          }
          ListHeaderComponent={ListHeaderComponent}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ flexDirection: "column", flex: 1 }}
          numColumns={2}
          data={productsData}
          renderItem={({ item }) => (
            <ProductList
              navigation={props.navigation}
              key={item._id}
              item={item}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
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
