import React, { createContext, useContext, useState } from 'react';

export const initialReportData = {
  "Barangay Clearance": {
    font: "Arial",
    fontSize: 14,
    fontStyle: "normal",
    content: "This is the content of Barangay Clearance"
  },
  "Certificate of Indigency": {
    font: "Times New Roman",
    fontSize: 16,
    fontStyle: "italic",
    content: "This is the content of Certificate of Indigency"
  },
  "Barangay ID": {
    font: "Courier New",
    fontSize: 18,
    fontStyle: "bold",
    content: "This is the content of Barangay ID"
  },
  "Business Permit": {
    font: "Arial",
    fontSize: 14,
    fontStyle: "normal",
    content: "This is the content of Business Permit"
  },
  "Barangay Certificate": {
    font: "Times New Roman",
    fontSize: 16,
    fontStyle: "italic",
    content: "This is the content of Barangay Certificate"
  }
};

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(initialReportData);

  return (
    <ReportContext.Provider value={{ reportData, setReportData }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
