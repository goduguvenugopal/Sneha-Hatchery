import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import useRegisterServiceWorker from "./assets/utils/useRegisterServiceWorker";
import { Routes } from "react-router-dom";
import Navbar from "./assets/Layout/Navbar";

function App() {
  useRegisterServiceWorker(); // Register service worker

  return (
    <>
      <Navbar />
      <Routes></Routes>
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
    </>
  );
}

export default App;
