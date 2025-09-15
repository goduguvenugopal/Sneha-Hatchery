import React from "react";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Modal = () => {
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

export const InputModal = ({handleSubmit , password , setPassword, error}) =>{
  return (
      <div className="h-[90vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-[320px]">
          <div className="flex justify-center text-4xl text-gray-700 mb-4">
            <FaLock />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">Enter Password</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaUnlock /> Submit
            </button>
          </form>
        </div>
      </div>
  )
}
