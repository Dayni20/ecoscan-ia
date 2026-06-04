import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScanHistoryItem, ScanResult } from "../types/scan";

const HISTORY_KEY_PREFIX = "@ecoscan_ia_history";
const MAX_HISTORY_ITEMS = 30;

const getHistoryKey = (userId?: string | null): string => {
  return `${HISTORY_KEY_PREFIX}_${userId ?? "guest"}`;
};

export const getScanHistory = async (
  userId?: string | null
): Promise<ScanHistoryItem[]> => {
  const storedHistory = await AsyncStorage.getItem(getHistoryKey(userId));

  if (!storedHistory) {
    return [];
  }

  try {
    return JSON.parse(storedHistory) as ScanHistoryItem[];
  } catch {
    await AsyncStorage.removeItem(getHistoryKey(userId));
    return [];
  }
};

export const saveScanToHistory = async ({
  userId,
  photoUri,
  result,
}: {
  userId?: string | null;
  photoUri: string;
  result: ScanResult;
}): Promise<void> => {
  const currentHistory = await getScanHistory(userId);
  const newItem: ScanHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    photoUri,
    result,
    scannedAt: new Date().toISOString(),
  };

  const updatedHistory = [newItem, ...currentHistory].slice(0, MAX_HISTORY_ITEMS);
  await AsyncStorage.setItem(getHistoryKey(userId), JSON.stringify(updatedHistory));
};

export const clearScanHistory = async (
  userId?: string | null
): Promise<void> => {
  await AsyncStorage.removeItem(getHistoryKey(userId));
};
