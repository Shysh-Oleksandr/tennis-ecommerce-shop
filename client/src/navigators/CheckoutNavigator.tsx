import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Cart from "../Screens/Cart/Cart";
import Checkout from "../Screens/Cart/checkout/Checkout";
import Payment from "./../Screens/Cart/checkout/Payment";
import Confirm from "./../Screens/Cart/checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
};

export default function CheckoutNavigator() {
  return <MyTabs />;
}
