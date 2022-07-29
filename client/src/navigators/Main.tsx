import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../app/hooks";
import CartIcon from "../shared/CartIcon";
import Header from "../shared/Header";
import AdminNavigator from "./AdminNavigator";
import CartNavigator from "./CartNavigator";
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const { user } = useAppSelector((store) => store.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              color={color}
              style={{ position: "relative" }}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ position: "relative" }}>
              <Icon
                name="shopping-cart"
                color={color}
                style={{ position: "relative" }}
                size={30}
              />
              <CartIcon />
            </View>
          ),
        }}
      />
      {user.isAdmin ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
