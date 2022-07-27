import React from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import IProduct from "../../interfaces/product";
import SearchedProduct from "./SearchedProduct";

type Props = {
  filteredProducts: IProduct[];
};

const { width } = Dimensions.get("window");

const SearchedProducts = ({ filteredProducts }: Props) => {
  return (
    <View style={{ width: width - 40 }}>
      {filteredProducts.length > 0 ? (
        <View>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <SearchedProduct key={item._id} product={item} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      ) : (
        <View style={tw`items-center justify-center`}>
          <Text style={tw`text-center`}>
            No products match the selected filter
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;
