import { useState } from "react";

export const LetterForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    receiver: "",
    receiver2: "",
    date: "",
    subject: "",
    respected: "",
    signatory1: "",
    signatory2: "",
    signatory3: "",
    signatory4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Notify parent updated data
    onFormDataChange(updatedData);
  };

  return (
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
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Signatory
          </label>
          <div className="mt-2">
            <textarea
              id="signatory1"
              name="signatory1"
              rows="3"
              value={formData.signatory1}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Signatory
          </label>
          <div className="mt-2">
            <textarea
              id="signatory2"
              name="signatory2"
              rows="3"
              value={formData.signatory2}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Signatory
          </label>
          <div className="mt-2">
            <textarea
              id="signatory3"
              name="signatory3"
              rows="3"
              value={formData.signatory3}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Signatory
          </label>
          <div className="mt-2">
            <textarea
              id="signatory4"
              name="signatory4"
              rows="3"
              value={formData.signatory4}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
