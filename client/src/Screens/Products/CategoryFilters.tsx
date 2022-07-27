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
          marginBottom: 20,
          marginTop: -30,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
          paddingVertical: 15,
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
            key={item.id}
            category={item.name}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CategoryFilters;
