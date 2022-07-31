import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Banner from "../../shared/Banner";
import Loading from "../../shared/UI/Loading";
import SearchInput from "../../shared/UI/SearchInput";
import useDebounce from "./../../hooks/useDebounced";
import ICategory from "./../../interfaces/category";
import IProduct from "./../../interfaces/product";
import CategoryFilters from "./CategoryFilters";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

const bannerImages = [
  "https://t4.ftcdn.net/jpg/03/90/37/71/360_F_390377167_NYd4Zi29xUAxEFDcVwX8SYSbagv4At8N.jpg",
  "https://img.freepik.com/free-psd/digital-marketing-facebook-banner-template_237398-233.jpg?w=2000",
  "https://images.pexels.com/photos/247671/pexels-photo-247671.jpeg?cs=srgb&dl=pexels-pixabay-247671.jpg&fm=jpg",
];

const ProductContainer = (props: any) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [initialState, setInitialState] = useState(products);
  const [focus, setFocus] = useState(false);
  const isCategoryChosen: boolean = activeCategory.toLowerCase() === "all";
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const productsData: IProduct[] = isCategoryChosen
    ? products
    : categoryProducts;

  useEffect(() => {
    setFilteredProducts(products);
    setCategoryProducts(products);
  }, [products]);

  useEffect(() => {
    searchProduct(debouncedSearchValue);
  }, [debouncedSearchValue]);

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
        <Banner bannerImages={bannerImages} />
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
      <SearchInput
        setSearchValue={setSearchValue}
        focus={focus}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {productsLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default ProductContainer;
