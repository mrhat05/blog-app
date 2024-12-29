import React from 'react';

const DialogBox = ({ 
  isOpen, 
  title = "Are you sure?", 
  message = "Do you really want to proceed?", 
  options = [
    { label: "Yes", action: () => console.log("Yes clicked") },
    { label: "No", action: () => console.log("No clicked") }
  ] 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              {option.label}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DialogBox;
