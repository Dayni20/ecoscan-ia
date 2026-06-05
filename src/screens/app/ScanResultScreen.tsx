import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { APP_BACKGROUND_IMAGE } from "../../constants/images";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { scanResultStyles } from "../../styles/appStyle";
import { DetectedResidue } from "../../types/scan";

type ScanResultScreenProps = StackScreenProps<AppStackParamList, "ScanResult">;

export const ScanResultScreen = ({
  navigation,
  route,
}: ScanResultScreenProps): React.ReactElement => {
  const { photoUri, result } = route.params;
  const normalizeName = (name: string): string => name.trim().toLowerCase();
  const otherItems: DetectedResidue[] = (result.detectedItems ?? []).filter(
    (item) => normalizeName(item.residueName) !== normalizeName(result.residueName)
  );

  return (
    <ImageBackground
      source={{ uri: APP_BACKGROUND_IMAGE }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={scanResultStyles.container}>
        <TouchableOpacity
          style={scanResultStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#236B2E" />
        </TouchableOpacity>

        <View style={scanResultStyles.header}>
          <Text style={scanResultStyles.title}>Resultado</Text>
          <Text style={scanResultStyles.subtitle}>
            Asi identificamos tu residuo
          </Text>
        </View>

        <View style={scanResultStyles.summaryCard}>
          <Image
            source={{ uri: photoUri }}
            style={scanResultStyles.photo}
            resizeMode="cover"
          />

          <View style={scanResultStyles.summaryInfo}>
            <Text style={scanResultStyles.label}>Tu residuo es:</Text>
            <Text style={scanResultStyles.residueName}>
              {result.residueName}
            </Text>

            <View
              style={[
                scanResultStyles.badge,
                result.isRecyclable
                  ? scanResultStyles.recyclableBadge
                  : scanResultStyles.notRecyclableBadge,
              ]}
            >
              <Ionicons
                name={result.isRecyclable ? "checkmark-circle" : "close-circle"}
                size={20}
                color={result.isRecyclable ? "#236B2E" : "#B42318"}
              />
              <Text
                style={[
                  scanResultStyles.badgeText,
                  result.isRecyclable
                    ? scanResultStyles.recyclableText
                    : scanResultStyles.notRecyclableText,
                ]}
              >
                {result.isRecyclable ? "Reciclable" : "No reciclable"}
              </Text>
            </View>

            <Text style={scanResultStyles.description}>
              {result.shortDescription}
            </Text>
          </View>
        </View>

        {otherItems.length > 0 && (
          <>
            <View style={scanResultStyles.sectionTitleRow}>
              <Ionicons name="albums-outline" size={22} color="#236B2E" />
              <Text style={scanResultStyles.sectionTitle}>
                Otros residuos detectados
              </Text>
            </View>

            <View style={scanResultStyles.detectedList}>
              {otherItems.map((item, index) => (
                <View
                  key={`${item.residueName}-${index}`}
                  style={scanResultStyles.detectedItem}
                >
                  <View style={scanResultStyles.detectedIcon}>
                    <Ionicons
                      name={
                        item.isRecyclable ? "checkmark-circle" : "alert-circle"
                      }
                      size={24}
                      color={item.isRecyclable ? "#236B2E" : "#B42318"}
                    />
                  </View>

                  <View style={scanResultStyles.detectedText}>
                    <Text style={scanResultStyles.detectedName}>
                      {item.residueName}
                    </Text>
                    <Text style={scanResultStyles.detectedDescription}>
                      {item.shortDescription}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={scanResultStyles.sectionTitleRow}>
          <Ionicons name="leaf" size={22} color="#236B2E" />
          <Text style={scanResultStyles.sectionTitle}>Que puedes hacer?</Text>
        </View>

        <View style={scanResultStyles.recommendationCard}>
          <View style={scanResultStyles.recommendationIcon}>
            <Ionicons name="refresh-circle-outline" size={32} color="#4FAE3A" />
          </View>
          <Text style={scanResultStyles.recommendationText}>
            {result.recommendation}
          </Text>
        </View>

        <View style={scanResultStyles.sectionTitleRow}>
          <Ionicons name="leaf" size={22} color="#236B2E" />
          <Text style={scanResultStyles.sectionTitle}>
            Informacion adicional
          </Text>
        </View>

        <View style={scanResultStyles.infoCard}>
          <View style={scanResultStyles.infoItem}>
            <View style={scanResultStyles.infoIcon}>
              <Ionicons name="bulb-outline" size={26} color="#236B2E" />
            </View>
            <View style={scanResultStyles.infoText}>
              <Text style={scanResultStyles.infoTitle}>Sabias que?</Text>
              <Text style={scanResultStyles.infoDescription}>
                {result.funFact}
              </Text>
            </View>
          </View>

          <View style={scanResultStyles.divider} />

          <View style={scanResultStyles.infoItem}>
            <View style={scanResultStyles.infoIcon}>
              <Ionicons name="calendar-outline" size={26} color="#236B2E" />
            </View>
            <View style={scanResultStyles.infoText}>
              <Text style={scanResultStyles.infoTitle}>
                Tiempo de degradacion
              </Text>
              <Text style={scanResultStyles.infoDescription}>
                {result.degradationTime}
              </Text>
            </View>
          </View>

          <View style={scanResultStyles.divider} />

          <View style={scanResultStyles.infoItem}>
            <View style={scanResultStyles.infoIcon}>
              <Ionicons name="earth-outline" size={26} color="#236B2E" />
            </View>
            <View style={scanResultStyles.infoText}>
              <Text style={scanResultStyles.infoTitle}>Impacto ambiental</Text>
              <Text style={scanResultStyles.infoDescription}>
                {result.environmentalImpact}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={scanResultStyles.primaryButton}
          onPress={() => navigation.replace("Camera")}
        >
          <Ionicons name="refresh" size={26} color="#FFFFFF" />
          <Text style={scanResultStyles.primaryButtonText}>
            Escanear otro residuo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={scanResultStyles.secondaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={26} color="#236B2E" />
          <Text style={scanResultStyles.secondaryButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};
