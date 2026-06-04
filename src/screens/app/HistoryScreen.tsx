import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { APP_BACKGROUND_IMAGE } from "../../constants/images";
import { useAuth } from "../../hooks/useAuth";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { clearScanHistory, getScanHistory } from "../../services/historyService";
import { historyStyles } from "../../styles/appStyle";
import { ScanHistoryItem } from "../../types/scan";

type HistoryScreenProps = StackScreenProps<AppStackParamList, "History">;

export const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadHistory = async () => {
    const items = await getScanHistory(user?.uid);
    setHistory(items);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadHistory().finally(() => setLoading(false));
    }, [user?.uid])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Limpiar historial",
      "Quieres eliminar todos los residuos escaneados?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await clearScanHistory(user?.uid);
            setHistory([]);
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={{ uri: APP_BACKGROUND_IMAGE }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={historyStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <TouchableOpacity
          style={historyStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#236B2E" />
        </TouchableOpacity>

        <View style={historyStyles.header}>
          <Ionicons name="time-outline" size={48} color="#236B2E" />
          <Text style={historyStyles.title}>Historial</Text>
          <Text style={historyStyles.subtitle}>
            Revisa los residuos que has escaneado
          </Text>
        </View>

        {loading ? (
          <View style={historyStyles.emptyCard}>
            <ActivityIndicator color="#236B2E" size="large" />
            <Text style={historyStyles.emptyText}>Cargando historial...</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={historyStyles.emptyCard}>
            <Ionicons name="leaf-outline" size={52} color="#6FA66A" />
            <Text style={historyStyles.emptyTitle}>Aun no hay escaneos</Text>
            <Text style={historyStyles.emptyText}>
              Cuando analices un residuo, aparecera aqui con su foto,
              categoria y recomendacion.
            </Text>
            <TouchableOpacity
              style={historyStyles.primaryButton}
              onPress={() => navigation.navigate("Camera")}
            >
              <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
              <Text style={historyStyles.primaryButtonText}>Escanear residuo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={historyStyles.summaryRow}>
              <Text style={historyStyles.countText}>
                {history.length} escaneo{history.length === 1 ? "" : "s"}
              </Text>
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={historyStyles.clearText}>Limpiar</Text>
              </TouchableOpacity>
            </View>

            {history.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={historyStyles.historyCard}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate("ScanResult", {
                    photoUri: item.photoUri,
                    result: item.result,
                  })
                }
              >
                <Image
                  source={{ uri: item.photoUri }}
                  style={historyStyles.photo}
                  resizeMode="cover"
                />

                <View style={historyStyles.cardContent}>
                  <Text style={historyStyles.dateText}>{formatDate(item.scannedAt)}</Text>
                  <Text style={historyStyles.residueName} numberOfLines={1}>
                    {item.result.residueName}
                  </Text>
                  <Text style={historyStyles.categoryText} numberOfLines={1}>
                    Categoria: {item.result.category}
                  </Text>

                  <View
                    style={[
                      historyStyles.badge,
                      item.result.isRecyclable
                        ? historyStyles.recyclableBadge
                        : historyStyles.notRecyclableBadge,
                    ]}
                  >
                    <Ionicons
                      name={
                        item.result.isRecyclable
                          ? "checkmark-circle"
                          : "close-circle"
                      }
                      size={17}
                      color={item.result.isRecyclable ? "#236B2E" : "#B42318"}
                    />
                    <Text
                      style={[
                        historyStyles.badgeText,
                        item.result.isRecyclable
                          ? historyStyles.recyclableText
                          : historyStyles.notRecyclableText,
                      ]}
                    >
                      {item.result.isRecyclable ? "Reciclable" : "No reciclable"}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#236B2E" />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};
