import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductContainer from "./src/Screens/Products/ProductContainer";
import Header from "./src/shared/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

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
    paddingBottom: 20,
    paddingTop: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
