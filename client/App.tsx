import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductContainer from "./src/Screens/Products/ProductContainer";
import Header from "./src/shared/Header";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header />
          <ProductContainer />
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
