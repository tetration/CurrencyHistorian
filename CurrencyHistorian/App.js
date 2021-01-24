import { StatusBar } from "expo-status-bar";
import React from "react";
//import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddCurrencyScreen from "./screens/AddCurrencyScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import CurrencyDetailScreen from "./screens/CurrencyDetailScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="AddCurrencyScreen"
        component={AddCurrencyScreen}
        options={{ title: "Add Currency" }}
      />
      <Stack.Screen
        name="CurrencyScreen"
        component={CurrencyScreen}
        options={{ title: "Currencies List" }}
      />
      <Stack.Screen
        name="CurrencyDetailScreen"
        component={CurrencyDetailScreen}
        options={{ title: "Currency Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
