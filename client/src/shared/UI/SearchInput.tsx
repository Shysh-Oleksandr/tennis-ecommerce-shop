import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

type Props = {
  setSearchValue: (value: React.SetStateAction<string>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  focus?: boolean;
};

const SearchInput = ({ setSearchValue, onFocus, onBlur, focus }: Props) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        onChangeText={(text) => setSearchValue(text)}
        style={styles.searchInput}
        placeholder="Search"
        onFocus={onFocus}
      />
      {focus ? (
        <Icon
          name="close"
          style={{ position: "absolute", right: 6, top: "20%", fontSize: 25 }}
          onPress={onBlur}
        />
      ) : null}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    backgroundColor: "lightgray",
  },
  searchContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    position: "relative",
  },
});
