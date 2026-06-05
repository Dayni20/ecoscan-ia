import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateScanReportData, ScanReport } from "../types/report";

const REPORTS_KEY_PREFIX = "@ecoscan_ia_reports";
const MAX_REPORTS = 30;

const getReportsKey = (userId?: string | null): string => {
  return `${REPORTS_KEY_PREFIX}_${userId ?? "guest"}`;
};

export const getReports = async (
  userId?: string | null
): Promise<ScanReport[]> => {
  const storedReports = await AsyncStorage.getItem(getReportsKey(userId));

  if (!storedReports) {
    return [];
  }

  try {
    return JSON.parse(storedReports) as ScanReport[];
  } catch {
    await AsyncStorage.removeItem(getReportsKey(userId));
    return [];
  }
};

export const saveReport = async (
  userId: string | null | undefined,
  reportData: CreateScanReportData
): Promise<ScanReport[]> => {
  const currentReports = await getReports(userId);
  const newReport: ScanReport = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    photoUri: reportData.photoUri,
    result: reportData.result,
    scannedAt: new Date().toISOString(),
  };

  const updatedReports = [newReport, ...currentReports].slice(0, MAX_REPORTS);
  await AsyncStorage.setItem(getReportsKey(userId), JSON.stringify(updatedReports));

  return updatedReports;
};

export const clearReports = async (
  userId?: string | null
): Promise<void> => {
  await AsyncStorage.removeItem(getReportsKey(userId));
};
