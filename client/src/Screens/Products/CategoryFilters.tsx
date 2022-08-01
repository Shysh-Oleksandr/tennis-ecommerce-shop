import React from "react";
import { FlatList, View } from "react-native";
import ICategory from "../../interfaces/category";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: ICategory[];
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
};

const CategoryFilters = ({
  categories,
  setActiveCategory,
  activeCategory,
}: Props) => {
  return (
    <View>
      <FlatList
        horizontal
        style={{
          flexDirection: "row",
          marginBottom: 35,
          marginTop: -30,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={categories}
        ListHeaderComponent={
          <CategoryItem
            category={"All"}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        }
        renderItem={({ item }) => (
          <CategoryItem
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            key={item._id}
            category={item.name}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CategoryFilters;
