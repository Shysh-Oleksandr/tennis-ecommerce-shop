import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";

type Props = {};

const Header = (props: Props) => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
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
    padding: 20,
  },
});
