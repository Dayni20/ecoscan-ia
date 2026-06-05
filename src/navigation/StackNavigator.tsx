import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";

export const StackNavigator = (): React.ReactElement => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Iniciando aplicacion..." />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
