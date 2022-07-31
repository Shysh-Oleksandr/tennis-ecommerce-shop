import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.header, tw`shadow-2xl`]}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/tennis.png")}
          resizeMode="contain"
          style={{ height: 50 }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
