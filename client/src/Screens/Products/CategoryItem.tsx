import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  category: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
};

const CategoryItem = ({
  category,
  setActiveCategory,
  activeCategory,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setActiveCategory(category)}
    >
      <Text
        style={[
          tw`text-lg px-3 my-3 text-white rounded-3xl text-center ${
            category === activeCategory ? "bg-blue-700" : "bg-blue-400"
          } shadow-lg mr-2`,
          { minWidth: 70, paddingVertical: 2 },
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};
export default CategoryItem;
