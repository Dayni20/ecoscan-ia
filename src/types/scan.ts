export interface DetectedResidue {
  residueName: string;
  category: string;
  isRecyclable: boolean;
  shortDescription: string;
  recommendation: string;
}

export interface ScanResult {
  residueName: string;
  category: string;
  isRecyclable: boolean;
  shortDescription: string;
  recommendation: string;
  funFact: string;
  degradationTime: string;
  environmentalImpact: string;
  detectedItems?: DetectedResidue[];
}

export interface ScanHistoryItem {
  id: string;
  photoUri: string;
  result: ScanResult;
  scannedAt: string;
}
