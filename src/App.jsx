import { useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";

import { RoomPermission } from "./Documents/RoomPermission";
import { Letter } from "./Documents/Letter";
import { RoomPermissionForm } from "./Forms/RoomPermissionForm";
import { LetterForm } from "./Forms/LetterForm";

import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");
  const [documentType, setDocumentType] = useState("RoomPermission");

  useEffect(() => {
    const generatePdfBlob = async () => {
      const DocumentComponent = documentType === "RoomPermission" ? RoomPermission : Letter;
      const blob = await pdf(<DocumentComponent formData={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdfBlob();
  }, [formData, documentType]);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-white w-full bg-opacity-50 p-8 rounded-lg shadow-lg border-2 border-black"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="mb-4">
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
            Select Document Type:
          </label>
          <select
            id="documentType"
            value={documentType}
            onChange={handleDocumentTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="RoomPermission">Room Permission</option>
            <option value="Letter">Application Letter</option>
          </select>
        </div>

        {documentType === "RoomPermission" ? (
          <RoomPermissionForm onFormDataChange={setFormData} />
        ) : (
          <LetterForm onFormDataChange={setFormData} />
        )}

        <div className="mt-4 text-center">
          <PDFDownloadLink
            document={documentType === "RoomPermission" ? <RoomPermission formData={formData} /> : <Letter formData={formData} />}
            fileName={`${documentType}.pdf`}
          >
            {
              <button className="p-2 bg-blue-500 text-white rounded">
                Download PDF
              </button>
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default App;
