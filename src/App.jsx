import { createContext, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import useRegisterServiceWorker from "./assets/utils/useRegisterServiceWorker";
import { Route, Routes } from "react-router-dom";
import Navbar from "./assets/Layout/Navbar";
import Home from "./assets/Layout/Home";
import Administration from "./assets/Layout/Administration";
import Login from "./assets/Layout/Login";
import axios from "axios";
import PageNotFound from "./assets/components/PageNotFound";
import Account from "./assets/Layout/Account"; 

export const EnvContext = createContext();
export const EmployeeContext = createContext();

function App() {
  const base_api_url = import.meta.env.VITE_BASE_API_URL;
  const public_vapid_key = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const [token, setToken] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [loader, setLoader] = useState(true);
  useRegisterServiceWorker(); // Register service worker


  useEffect(() => {
    // retrieving sessionstorage data
    const empToken = sessionStorage.getItem("employeeToken");
    if (empToken) {
      setToken(JSON.parse(empToken));
    }
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await axios.get(`${base_api_url}/api/get/single/employee`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setEmployeeData(res.data?.data);
         
          setLoader(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchEmployeeData();
    }
  }, [token]);

  return (
    <>
      <EnvContext.Provider value={{ base_api_url, public_vapid_key }}>
        <EmployeeContext.Provider
          value={{ token, setToken, employeeData, setEmployeeData }}
        >
          {token && employeeData?.employeeName && <Navbar />}
          <Routes>
            {token ? (
              <>
                <Route path="/" element={<Home loader={loader} />} />
                <Route path="/administration" element={<Administration />} />
                <Route path="/account" element={<Account />} />
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="*" element={<PageNotFound />} />
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
