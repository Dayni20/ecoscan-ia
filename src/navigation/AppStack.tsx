import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/app/HomeScreen";
import { AppStackParamList } from "./typeNavigation";

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#4F46E5",
        headerTitleStyle: {
          fontWeight: "700" as const,
          color: "#1A202C",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
