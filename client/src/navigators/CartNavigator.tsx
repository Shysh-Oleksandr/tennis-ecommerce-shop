import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Cart from "../Screens/Cart/Cart";
import CartTabsNavigator from "./CartTabsNavigator";
import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Checkout" component={CheckoutNavigator} />
    </Stack.Navigator>
  );
};

export default function CartNavigator() {
  return <MyStack />;
}
