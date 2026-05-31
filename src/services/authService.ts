import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { LoginForm, RegisterForm } from "../types/auth";

export const loginWithEmail = async (
  data: LoginForm
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, data.email.trim(), data.password);
};

export const registerWithEmail = async (
  data: RegisterForm
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
};

export const logout = async (): Promise<void> => {
  return signOut(auth);
};
