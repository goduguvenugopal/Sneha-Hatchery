import { createContext, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import useRegisterServiceWorker from "./assets/utils/useRegisterServiceWorker";
import { Route, Routes } from "react-router-dom";
import Navbar from "./assets/Layout/Navbar";
import Home from "./assets/Layout/Home";
import Administration from "./assets/Layout/Administration";
import Login from "./assets/Layout/Login";

export const EnvContext = createContext();
export const EmployeeContext = createContext();

function App() {
  const base_api_url = import.meta.env.VITE_BASE_API_URL;
  const public_vapid_key = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const [token, setToken] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  useRegisterServiceWorker(); // Register service worker

  return (
    <>
      <EnvContext.Provider value={{ base_api_url, public_vapid_key }}>
        <EmployeeContext.Provider value={{ token, setToken , employeeData , setEmployeeData}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
        </EmployeeContext.Provider>
      </EnvContext.Provider>
    </>
  );
}

export default App;
