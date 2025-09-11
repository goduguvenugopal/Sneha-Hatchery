import React from "react";

const Modal = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 z-50">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full"
        >
          <h2 className="text-lg font-semibold mb-3 text-orange-600">Cancel</h2>
          <p className="mb-4">are you sure ?</p>
          <div className="flex justify-end gap-2">
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500">
              Okay
            </button>
            <button className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-blue-700">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
