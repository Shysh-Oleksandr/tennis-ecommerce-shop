import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import IProduct from "../../interfaces/product";
import SearchedProduct from "./SearchedProduct";

type Props = {
  filteredProducts: IProduct[];
  navigation: any;
};

const { width } = Dimensions.get("window");

const SearchedProducts = ({ filteredProducts, navigation }: Props) => {
  return (
    <View style={{ width: width - 40, marginHorizontal: 20, flex: 1 }}>
      {filteredProducts.length > 0 ? (
        <>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <SearchedProduct
                navigation={navigation}
                key={item._id}
                product={item}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <View style={tw`items-center justify-center`}>
          <Text style={tw`text-center text-xl`}>
            No products match the selected filter
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;
