import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Cart from "../Screens/Cart/Cart";
import Checkout from "./../Screens/Cart/Checkout";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function CartNavigator() {
  return <MyStack />;
}
