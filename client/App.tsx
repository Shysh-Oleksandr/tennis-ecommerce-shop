import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductContainer from "./src/Screens/Products/ProductContainer";
import Header from "./src/shared/Header";
import SafeAreaView from "react-native-safe-area-view";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/navigators/Main";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Header />
            <Main />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
  },
});
