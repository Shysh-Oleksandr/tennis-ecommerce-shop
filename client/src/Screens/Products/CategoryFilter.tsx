import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ICategory from "./../../interfaces/category";

type Props = { category: ICategory };

const CategoryFilter = ({ category }: Props) => {
  return (
    <View>
      <Text>{category.name}</Text>
    </View>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({});
