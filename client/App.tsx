import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import Main from "./src/navigators/Main";
import Header from "./src/shared/Header";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Header />
            <Main />
            <Toast />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
