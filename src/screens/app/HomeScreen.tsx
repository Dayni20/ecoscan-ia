import React from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { APP_BACKGROUND_IMAGE } from "../../constants/images";
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
    <ImageBackground
      source={{ uri: APP_BACKGROUND_IMAGE }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={homeStyles.container}>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
        <View style={homeStyles.logoCenter}>
          <Text style={homeStyles.emoji}>♻️</Text>
          <Text style={homeStyles.greeting}>EcoScan IA</Text>
          <Text style={homeStyles.subtitle}>
            Clasifica tus residuos con ayuda de inteligencia artificial
          </Text>
        </View>
          <View style={homeStyles.heroText}>
            <Text style={homeStyles.greeting}>Bienvenid@!</Text>
            <Text style={homeStyles.email}>
              {user?.email ?? "Cuida el planeta escaneando tus residuos."}
            </Text>
          </View>
          <Ionicons name="earth" size={78} color="#6FA66A" />
        
        <View style={homeStyles.sectionHeader}>
          <Ionicons name="leaf" size={20} color="#2F6B2F" />
          <Text style={homeStyles.sectionTitle}>Que quieres hacer hoy?</Text>
        </View>

        <TouchableOpacity
          style={[homeStyles.actionCard, homeStyles.primaryAction]}
        >
          <View style={homeStyles.actionIconPrimary}>
            <Ionicons name="camera-outline" size={34} color="#FFFFFF" />
          </View>
          <View style={homeStyles.actionText}>
            <Text style={homeStyles.actionTitle}>Escanear residuo</Text>
            <Text style={homeStyles.actionDescription}>
              Usa la camara para identificar el tipo de residuo.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={30} color="#236B2E" />
        </TouchableOpacity>

        <TouchableOpacity style={homeStyles.actionCard}>
          <View style={homeStyles.actionIconSecondary}>
            <Ionicons name="clipboard-outline" size={34} color="#236B2E" />
          </View>
          <View style={homeStyles.actionText}>
            <Text style={homeStyles.actionTitle}>Ver historial</Text>
            <Text style={homeStyles.actionDescription}>
              Revisa los residuos que has escaneado.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={30} color="#236B2E" />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};
