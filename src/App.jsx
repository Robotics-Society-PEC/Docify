import { useState, useEffect } from "react";
import { PDFDownloadLink, pdf, PDFViewer } from "@react-pdf/renderer";

import { RoomPermission } from "./Documents/RoomPermission";
import { Letter } from "./Documents/Letter";
import { RoomPermissionForm } from "./Forms/RoomPermissionForm";
import { LetterForm } from "./Forms/LetterForm";

import "./App.css";

const Footer = () => (
  <footer className="bg-gray-800 text-white text-center py-4 mt-8 w-full">
    <p>
      Made by{" "}
      <a href="https://github.com/Witty-Wizard" className="text-blue-400">
        Shashank Agarwal{" "}
      </a>
      ❤️
    </p>
  </footer>
);
const App = () => {
  const [formData, setFormData] = useState({});
  const [documentType, setDocumentType] = useState("RoomPermission");

  useEffect(() => {
    const generatePdfBlob = async () => {
      const DocumentComponent =
        documentType === "RoomPermission" ? RoomPermission : Letter;
      const blob = await pdf(
        <DocumentComponent formData={formData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdfBlob();
  }, [formData, documentType]);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="bg-white w-full bg-opacity-50 p-8 rounded-lg shadow-lg border-2 border-black flex"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="w-1/2 pr-4">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="documentType"
                  className="block text-sm font-medium text-gray-900"
                >
                  Select Document Type:
                </label>
                <div className="mt-2">
                  <select
                    id="documentType"
                    value={documentType}
                    onChange={handleDocumentTypeChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  >
                    <option value="">Select...</option>
                    <option value="RoomPermission">Room Permission</option>
                    <option value="Letter">Application Letter</option>
                  </select>
                </div>
              </div>
            </div>

            {documentType === "RoomPermission" ? (
              <RoomPermissionForm onFormDataChange={setFormData} />
            ) : (
              <LetterForm onFormDataChange={setFormData} />
            )}
          </div>
          <div className="w-1/2 pl-4 flex flex-col">
            <div className="flex-grow">
              <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
                {documentType === "RoomPermission" ? (
                  <RoomPermission formData={formData} />
                ) : (
                  <Letter formData={formData} />
                )}
              </PDFViewer>
            </div>
            <div className="mt-4 text-center">
              <PDFDownloadLink
                document={
                  documentType === "RoomPermission" ? (
                    <RoomPermission formData={formData} />
                  ) : (
                    <Letter formData={formData} />
                  )
                }
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
      </div>
      <Footer></Footer>
    </>
  );
};

export default App;
