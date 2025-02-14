import { useState } from "react";
import { summarizeText } from "../utils/summarize";

export const RoomPermissionForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    society: "",
    eventName: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
    roomNumber: "",
    department: "",
    eventDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onFormDataChange(updatedData);
  };

  const handleSummarize = async () => {
    const inputText = `
      Society: ${formData.society}
      Event Name : ${formData.eventName}
      on Date: ${formData.fromDate} to ${formData.toDate}
      Timings of the event will be from : ${formData.fromTime} to ${formData.toTime}
      Room Number: ${formData.roomNumber}
      Department: ${formData.department}
      for the interested students of the college.
    `;

    try {
      const summary = await summarizeText(inputText);
      handleChange({ target: { name: "eventDescription", value: summary } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-6">
      {[
        { label: "Name of Society", name: "society", type: "text" },
        { label: "Event Name", name: "eventName", type: "text" },
        { label: "From Date", name: "fromDate", type: "date" },
        { label: "To Date", name: "toDate", type: "date" },
        { label: "From Time", name: "fromTime", type: "time" },
        { label: "To Time", name: "toTime", type: "time" },
        { label: "Room Number", name: "roomNumber", type: "text" },
        { label: "Department", name: "department", type: "text" },
        {
          label: "Brief Event Description",
          name: "eventDescription",
          type: "textarea",
        },
      ].map((field) => (
        <div
          key={field.name}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 "
        >
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-900 ">
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
                  placeholder={field.placeholder || ""}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleSummarize}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Generate Event Description
      </button>
    </form>
  );
};
