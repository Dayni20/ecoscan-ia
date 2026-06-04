import React, { useState } from "react";
import {
  Alert,
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
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { registerWithEmail } from "../../services/authService";
import { registerStyles } from "../../styles/appStyle";
import { RegisterForm } from "../../types/auth";
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
} from "../../utils/validators";

type RegisterScreenProps = StackScreenProps<AuthStackParamList, "Register">;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (key: keyof RegisterForm, value: string) => {
    setRegisterForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!isValidEmail(registerForm.email)) {
      setEmailError("Ingresa un email valido");
      isValid = false;
    }

    if (!isValidPassword(registerForm.password)) {
      setPasswordError("La contrasena debe tener al menos 6 caracteres");
      isValid = false;
    }

    if (!passwordsMatch(registerForm.password, registerForm.confirmPassword)) {
      setConfirmError("Las contrasenas no coinciden");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await registerWithEmail(registerForm);
    } catch (error) {
      let message = "Error al registrarse. Intenta mas tarde";

      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          message = "Este email ya esta registrado";
        } else if (error.code === "auth/operation-not-allowed") {
          message = "Debes habilitar Email/Password en Firebase Authentication";
        } else if (error.code === "auth/network-request-failed") {
          message = "Revisa tu conexion a internet";
        } else if (error.code === "auth/invalid-email") {
          message = "El correo electronico no es valido";
        } else if (error.code === "auth/weak-password") {
          message = "La contrasena es demasiado debil";
        } else if (error.code === "auth/configuration-not-found") {
          message = "Firebase Authentication no esta configurado en este proyecto";
        }
      }

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={registerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.header}>
           <Text style={registerStyles.emoji}>♻️</Text>
          <Text style={registerStyles.title}>Crear cuenta</Text>
          <Text style={registerStyles.subtitle}>Registrate para comenzar</Text>
        </View>

        <View style={registerStyles.form}>
          <Input
            label="Correo electronico"
            placeholder="nombre@correo.com"
            value={registerForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
          />

          <Input
            label="Contrasena"
            placeholder="Minimo 6 caracteres"
            value={registerForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />

          <Input
            label="Confirmar contrasena"
            placeholder="Repite tu contrasena"
            value={registerForm.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            isPassword
            error={confirmError}
          />

          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            style={registerStyles.button}
          />
        </View>

        <View style={registerStyles.footer}>
          <Text style={registerStyles.footerText}>Ya tienes cuenta? </Text>
          <Text style={registerStyles.link} onPress={() => navigation.goBack()}>
            Inicia sesion
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
