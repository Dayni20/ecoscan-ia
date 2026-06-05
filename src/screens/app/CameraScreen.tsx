import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { analyzeResidueImage } from "../../services/aiService";
import { saveScanToHistory } from "../../services/historyService";
import { cameraStyles } from "../../styles/appStyle";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { useAuth } from "../../hooks/useAuth";

interface CapturedPhoto {
  uri: string;
  width: number;
  height: number;
}

type CameraScreenProps = StackScreenProps<AppStackParamList, "Camera">;

export const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const { user } = useAuth();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);

  const toggleCameraType = () => {
    setCameraType((currentType) =>
      currentType === "back" ? "front" : "back"
    );
  };

  const takePhoto = async () => {
    if (!cameraRef.current || takingPhoto) return;

    try {
      setTakingPhoto(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      setCapturedPhoto({
        uri: photo.uri,
        width: photo.width,
        height: photo.height,
      });
    } catch {
      Alert.alert("Error", "No se pudo tomar la foto. Intenta nuevamente.");
    } finally {
      setTakingPhoto(false);
    }
  };

  const analyzePhoto = async () => {
    if (!capturedPhoto || analyzing) return;

    try {
      setAnalyzing(true);
      const result = await analyzeResidueImage(capturedPhoto.uri);

      await saveScanToHistory({
        userId: user?.uid,
        photoUri: capturedPhoto.uri,
        result,
      });

      navigation.navigate("ScanResult", {
        photoUri: capturedPhoto.uri,
        result,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo analizar la imagen.";

      Alert.alert("Error", message);
    } finally {
      setAnalyzing(false);
    }
  };

  if (!permission) {
    return (
      <View style={cameraStyles.centerContent}>
        <ActivityIndicator size="large" color="#236B2E" />
        <Text style={cameraStyles.message}>Preparando camara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={cameraStyles.centerContent}>
        <Ionicons name="camera-outline" size={58} color="#236B2E" />
        <Text style={cameraStyles.title}>Permiso de camara</Text>
        <Text style={cameraStyles.message}>
          Necesitamos acceso a la camara para escanear residuos.
        </Text>
        <TouchableOpacity
          style={cameraStyles.primaryButton}
          onPress={requestPermission}
        >
          <Text style={cameraStyles.primaryButtonText}>Permitir camara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedPhoto) {
    return (
      <View style={cameraStyles.container}>
        <Image
          source={{ uri: capturedPhoto.uri }}
          style={cameraStyles.preview}
          resizeMode="cover"
        />

        <View style={cameraStyles.previewPanel}>
          <Text style={cameraStyles.title}>Vista previa</Text>
          <Text style={cameraStyles.message}>
            Si la foto esta clara, puedes analizar el residuo.
          </Text>

          <View style={cameraStyles.actionsRow}>
            <TouchableOpacity
              style={cameraStyles.secondaryButton}
              onPress={() => setCapturedPhoto(null)}
              disabled={analyzing}
            >
              <Text style={cameraStyles.secondaryButtonText}>Repetir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={cameraStyles.primaryButton}
              onPress={analyzePhoto}
              disabled={analyzing}
            >
              {analyzing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={cameraStyles.primaryButtonText}>Analizar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={cameraStyles.container}>
      <CameraView
        ref={cameraRef}
        style={cameraStyles.camera}
        facing={cameraType}
      />

      <View style={cameraStyles.cameraTopBar}>
        <TouchableOpacity
          style={cameraStyles.iconButton}
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={cameraStyles.cameraFooter}>
        <Text style={cameraStyles.cameraHint}>
          Enfoca el residuo dentro del recuadro
        </Text>

        <TouchableOpacity
          style={cameraStyles.captureButton}
          onPress={takePhoto}
          disabled={takingPhoto}
        >
          {takingPhoto ? (
            <ActivityIndicator color="#236B2E" />
          ) : (
            <View style={cameraStyles.captureButtonInner} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
