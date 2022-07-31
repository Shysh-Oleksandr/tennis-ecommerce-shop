import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Cart from "../Screens/Cart/Cart";
import Orders from "../Screens/Cart/Orders";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Your Cart">
      <Tab.Screen name="Your Cart" component={Cart} />
      <Tab.Screen name="Your Orders" component={Orders} />
    </Tab.Navigator>
  );
};

export default function CartTabsNavigator() {
  return <MyTabs />;
}
