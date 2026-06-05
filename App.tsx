import "react-native-gesture-handler";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { ReportProvider } from "./src/context/ReportContext";
import { StackNavigator } from "./src/navigation/StackNavigator";

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <ReportProvider>
        <StackNavigator />
      </ReportProvider>
    </AuthProvider>
  );
}
