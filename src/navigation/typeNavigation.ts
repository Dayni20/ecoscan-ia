import { ScanResult } from "../types/scan";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Camera: undefined;
  ScanResult: {
    photoUri: string;
    result: ScanResult;
  };
};
