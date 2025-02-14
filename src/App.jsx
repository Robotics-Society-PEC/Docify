import { useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";

import { RoomPermission } from "./Documents/RoomPermission";
import { Letter } from "./Documents/Letter";
import { RoomPermissionForm } from "./Forms/RoomPermissionForm";
import LetterForm from "./Forms/LetterForm";
import PaperViewer from "./PaperViewer";

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
  const [isMobile, setIsMobile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // State for generated PDF URL

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
        <div className="items-center justify-center bg-white bg-opacity-50 p-8 rounded-lg shadow-lg border-2 border-black flex flex-col md:flex-row w-full my-6 max-w-[95%] ">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full max-w-md mx-auto">
              <div className="sm:col-span-10">
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
                <div className="w-full">
                {documentType === "RoomPermission" ? (
                  <RoomPermissionForm onFormDataChange={setFormData} />
                ) : (
                  <LetterForm onFormDataChange={setFormData} />
                )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 pl-4 flex flex-col ">
            {!isMobile && pdfUrl && (
              <div className="flex-grow">
                <PaperViewer url={pdfUrl} />
              </div>
            )}

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
                <button className="p-2 bg-blue-500 text-white rounded">
                  Download PDF
                </button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
