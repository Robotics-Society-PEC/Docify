import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { Letter } from "./Documents/Letter";
import { RoomPermission } from "./Documents/RoomPermission";

import { LetterForm } from "./Forms/LetterForm";
import { RoomPermissionForm } from "./Forms/RoomPermissionForm";

import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-white w-full bg-opacity-50 p-8 rounded-lg shadow-lg border-2 border-black"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <RoomPermissionForm onFormDataChange={setFormData} />
        <div className="mt-6">
          <PDFViewer width={600} height={400} style={{ border: "none" }}>
            <RoomPermission formData={formData} />
          </PDFViewer>
        </div>

        <div className="mt-4 text-center">
          <PDFDownloadLink
            document={<RoomPermission formData={formData} />}
            fileName="Letter.pdf"
          >
            {({ loading }) =>
              loading ? (
                "Loading Document..."
              ) : (
                <button className="p-2 bg-blue-500 text-white rounded">
                  Download PDF
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default App;
