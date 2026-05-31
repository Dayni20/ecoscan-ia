import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/authService";
import { homeStyles } from "../../styles/appStyle";

export const HomeScreen = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Cerrar sesion", "Quieres salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => logout() },
    ]);
  };

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>Bienvenido</Text>
          <Text style={homeStyles.email}>{user?.email}</Text>
        </View>

        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
