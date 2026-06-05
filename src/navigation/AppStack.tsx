import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/app/HomeScreen";
import { CameraScreen } from "../screens/app/CameraScreen";
import { ScanResultScreen } from "../screens/app/ScanResultScreen";
import { HistoryScreen } from "../screens/app/HistoryScreen";
import { AppStackParamList } from "./typeNavigation";

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = (): React.ReactElement => {
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
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ title: "Escanear residuo" }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanResult"
        component={ScanResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
