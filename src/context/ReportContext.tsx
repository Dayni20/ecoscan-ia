import React, { createContext, ReactNode, useCallback, useState } from "react";
import { CreateScanReportData, ScanReport } from "../types/report";
import { clearReports, getReports, saveReport } from "../services/reportService";

export interface ReportContextType {
  reports: ScanReport[];
  loadingReports: boolean;
  loadReports: (userId?: string | null) => Promise<void>;
  addReport: (
    userId: string | null | undefined,
    reportData: CreateScanReportData
  ) => Promise<void>;
  clearUserReports: (userId?: string | null) => Promise<void>;
}

export const ReportContext = createContext<ReportContextType | undefined>(
  undefined
);

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportProvider = ({
  children,
}: ReportProviderProps): React.ReactElement => {
  const [reports, setReports] = useState<ScanReport[]>([]);
  const [loadingReports, setLoadingReports] = useState<boolean>(false);

  const loadReports = useCallback(async (
    userId?: string | null
  ): Promise<void> => {
    setLoadingReports(true);
    const storedReports = await getReports(userId);
    setReports(storedReports);
    setLoadingReports(false);
  }, []);

  const addReport = useCallback(
    async (
      userId: string | null | undefined,
      reportData: CreateScanReportData
    ): Promise<void> => {
      const updatedReports = await saveReport(userId, reportData);
      setReports(updatedReports);
    },
    []
  );

  const clearUserReports = useCallback(async (
    userId?: string | null
  ): Promise<void> => {
    await clearReports(userId);
    setReports([]);
  }, []);

  return (
    <ReportContext.Provider
      value={{
        reports,
        loadingReports,
        loadReports,
        addReport,
        clearUserReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
