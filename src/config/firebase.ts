// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADbXAzHsy5rgYISL7zcIbB6--jTR7Omgs",
  authDomain: "ecoscan-ia-871b4.firebaseapp.com",
  projectId: "ecoscan-ia-871b4",
  storageBucket: "ecoscan-ia-871b4.firebasestorage.app",
  messagingSenderId: "578509413400",
  appId: "1:578509413400:web:6a172d153aff2ee9fcf76d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});