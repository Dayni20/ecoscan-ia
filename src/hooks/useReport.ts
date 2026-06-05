import { useContext } from "react";
import { ReportContext, ReportContextType } from "../context/ReportContext";

export const useReport = (): ReportContextType => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error("useReport debe usarse dentro de <ReportProvider>");
  }

  return context;
};
