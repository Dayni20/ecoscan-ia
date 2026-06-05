import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { ReportProvider } from "./src/context/ReportContext";
import { StackNavigator } from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <StackNavigator />
      </ReportProvider>
    </AuthProvider>
  );
}
