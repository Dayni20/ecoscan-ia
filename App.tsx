import { AuthProvider } from './src/context/AuthContext';
import { Text } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <Text>Probando hast que este navegacion</Text>
    </AuthProvider>
  );
}