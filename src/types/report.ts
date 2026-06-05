import { ScanResult } from "./scan";

export interface ScanReport {
  id: string;
  photoUri: string;
  result: ScanResult;
  scannedAt: string;
}

export interface CreateScanReportData {
  photoUri: string;
  result: ScanResult;
}
