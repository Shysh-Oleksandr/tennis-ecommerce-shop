import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchData } from "../../hooks/useFetchData";
import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import { API_URL } from "../../constants";
import tw from "tailwind-react-native-classnames";
import ProductItem from "./ProductItem";
import Loading from "../../shared/UI/Loading";
import SearchInput from "../../shared/UI/SearchInput";
import useDebounce from "../../hooks/useDebounced";

type Props = {};

const Products = (props: Props) => {
  const [products, productsLoading] = useFetchData<IProduct>(
    "GET",
    `${API_URL}/products`,
    "products"
  );
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [categories, categoriesLoading] = useFetchData<ICategory>(
    "GET",
    `${API_URL}/categories`,
    "categories"
  );
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

  const searchProduct = (text: string) => {
    setFilteredProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  useEffect(() => {
    searchProduct(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const getTableHeader = () => {
    return (
      <View
        style={tw`flex-row w-full flex-1 bg-gray-200 px-4 py-2 items-center shadow-lg`}
      >
        <Text numberOfLines={1} style={tw`text-base w-12 font-bold`}></Text>
        <Text numberOfLines={1} style={tw`text-base w-1/5 mr-3 px-1 font-bold`}>
          Brand
        </Text>
        <Text numberOfLines={1} style={tw`text-base w-1/5 mr-3 px-1 font-bold`}>
          Name
        </Text>
        <Text numberOfLines={1} style={tw`text-base w-1/5 mr-3 px-1 font-bold`}>
          Category
        </Text>
        <Text numberOfLines={1} style={tw`text-base w-1/5 mr-3 px-1 font-bold`}>
          Price
        </Text>
      </View>
    );
  };

  if (productsLoading) {
    return <Loading />;
  }
  return (
    <View>
      <SearchInput setSearchValue={setSearchValue} />
      <FlatList
        ListEmptyComponent={
          <Text style={tw`text-2xl mt-4 text-center`}>No products found</Text>
        }
        data={filteredProducts}
        ListHeaderComponent={getTableHeader}
        renderItem={({ item, index }) => (
          <ProductItem
            // className={index % 2 === 1 ? tw`bg-gray-200` : ""}
            key={item._id}
            item={item}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Products;
