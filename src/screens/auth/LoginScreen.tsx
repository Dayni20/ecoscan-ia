import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FirebaseError } from "firebase/app";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { APP_BACKGROUND_IMAGE } from "../../constants/images";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { loginWithEmail } from "../../services/authService";
import { loginStyles } from "../../styles/appStyle";
import { LoginForm } from "../../types/auth";
import { isValidEmail, isValidPassword } from "../../utils/validators";

type LoginScreenProps = StackScreenProps<AuthStackParamList, "Login">;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (key: keyof LoginForm, value: string) => {
    setLoginForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(loginForm.email)) {
      setEmailError("Ingresa un email valido");
      isValid = false;
    }

    if (!isValidPassword(loginForm.password)) {
      setPasswordError("La contrasena debe tener al menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await loginWithEmail(loginForm);
    } catch (error) {
      const message =
        error instanceof FirebaseError && error.code === "auth/invalid-credential"
          ? "Email o contrasena incorrectos"
          : "Error al iniciar sesion. Intenta mas tarde";

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: APP_BACKGROUND_IMAGE }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={loginStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginStyles.header}>
            <Text style={loginStyles.emoji}>♻️</Text>
            <Text style={loginStyles.title}>EcoScan IA</Text>
            <Text style={loginStyles.subtitle}>
              Escanea, aprende y cuida el planeta
            </Text>
          </View>

          <View style={loginStyles.form}>
            <Input
              label="Correo electronico"
              placeholder="nombre@correo.com"
              value={loginForm.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
            />

            <Input
              label="Contrasena"
              placeholder="Minimo 6 caracteres"
              value={loginForm.password}
              onChangeText={(value) => handleInputChange("password", value)}
              isPassword
              error={passwordError}
            />

            <Button
              title="Iniciar sesion"
              onPress={handleLogin}
              loading={loading}
              style={loginStyles.button}
            />
          </View>

          <View style={loginStyles.footer}>
            <Text style={loginStyles.footerText}>No tienes cuenta? </Text>
            <Text
              style={loginStyles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Registrate
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
