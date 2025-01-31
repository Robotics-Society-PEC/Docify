import React, { useState } from "react";
import "./App.css";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

const MyDocument = ({ formData }) => {
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontFamily: "Times-Roman", fontSize: 11 }}>To,</Text>
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 11,
              marginBottom: 10,
            }}
          >
            {formData.receiver}
          </Text>
          {formData.receiver2 && (
            <>
              <Text style={{ fontFamily: "Times-Roman", fontSize: 11 }}>
                Through,
              </Text>
              <Text
                style={{
                  fontFamily: "Times-Roman",
                  fontSize: 11,
                  marginBottom: 10,
                }}
              >
                {formData.receiver2}
              </Text>
            </>
          )}
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 11,
              marginBottom: 10,
            }}
          >
            Date: {formatDate(formData.date)}
          </Text>
          <Text style={{ fontFamily: "Times-Roman", fontSize: 11 }}>
            Subject: {formData.subject}
          </Text>
          <Text
            style={{ fontFamily: "Times-Roman", fontSize: 11, marginTop: 10 }}
          >
            Respected {formData.respected},
          </Text>
          <Text
            style={{ fontFamily: "Times-Roman", fontSize: 11, marginTop: 10 }}
          >
            {formData.message}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    receiver: "",
    receiver2: "",
    date: "",
    subject: "",
    respected: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="bg-white w-full bg-opacity-50 p-8 rounded-lg shadow-lg border-2 border-black"
      style={{ marginLeft: "20px", marginRight: "20px" }}>
        <form className="space-y-6">
          {[
            { label: "To,", name: "receiver", type: "textarea" },
            { label: "Through,", name: "receiver2", type: "textarea" },
            { label: "Date", name: "date", type: "date" },
            { label: "Subject", name: "subject", type: "text" },
            { label: "Respected", name: "respected", type: "text" },
            { label: "Message", name: "message", type: "textarea" },
          ].map((field) => (
            <div
              key={field.name}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {field.label}
                </label>
                <div className="mt-2">
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows="3"
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </form>

        {/* <div className="mt-6">
          <PDFViewer width={600} height={400} style={{ border: "none" }}>
            <MyDocument formData={formData} />
          </PDFViewer>
        </div> */}

        <div className="mt-4 text-center">
          <PDFDownloadLink
            document={<MyDocument formData={formData} />}
            fileName="generated.pdf"
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
