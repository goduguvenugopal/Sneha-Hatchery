import { useEffect, useState } from "react";
import "./App.css";
import { toast, ToastContainer, Zoom } from "react-toastify";
import useRegisterServiceWorker from "./assets/utils/useRegisterServiceWorker";

function App() {
  useRegisterServiceWorker(); // Register service worker

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />

      <button
        onClick={() => toast("hello venugopal")}
        className="bg-blue-500 text-white p-2 rounded-2xl"
      >
        Toast
      </button>
    </>
  );
}

export default App;
