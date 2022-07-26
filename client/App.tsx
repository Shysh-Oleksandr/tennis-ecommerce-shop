import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductContainer from "./src/Screens/Products/ProductContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <ProductContainer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    paddingBottom: 20,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
