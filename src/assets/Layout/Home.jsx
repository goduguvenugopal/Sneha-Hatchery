import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import axios from "axios";
import { EmployeeContext, EnvContext } from "../../App";
import { toast } from "react-toastify";
import Generator from "./Generator";

const Home = ({ loader }) => {
  const { base_api_url } = useContext(EnvContext);
  const { token, employeeData } = useContext(EmployeeContext);
  const [generatorLogs, setGeneratorLogs] = useState([]);

  // start generator
  const startGenerator = async () => {
    try {
      const res = await axios.post(
        `${base_api_url}/api/generator/start`,
        {
          employeeCode: employeeData?.employeeCode,
          generatorId: 1,
          firstEmpName: employeeData?.employeeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Generator is not started Please try again");
    }
  };

  // get generator logs
  const fetchGeneratorLogs = async () => {
    try {
      const res = await axios.get(`${base_api_url}/api/generator/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setGeneratorLogs(res.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if token is available call function
    if (token) {
      fetchGeneratorLogs();
    }
  }, [token]);

  
  if (loader) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="pt-8 p-3">
      <h5 className="text-[1.2rem] lg:text-[1.3rem]   font-bold text-gray-700 text-center">
        Generator Tracking Management
      </h5>

      {/* here generator push buttons to show status green and red colors  */}
      <div className="flex justify-center gap-8 mt-8">
        {/* Start Button */}
        <button
          onClick={startGenerator}
          className="w-20 h-20 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 active:scale-95 transition"
        >
          Start
        </button>

        {/* Stop Button */}
        <button className="w-20 h-20 rounded-full bg-red-300 text-white font-bold text-lg shadow-lg hover:bg-red-600 active:scale-95 transition">
          Stop
        </button>
      </div>

      {/* Generator Status Buttons */}
      <div className="flex justify-center gap-3 mt-8">
        <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow">
          Generator 1 - ON
        </button>
        <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow">
          Generator 2 - OFF
        </button>
      </div>

      <h5 className="text-[1.2rem] lg:text-[1.3rem] my-5  font-bold text-gray-700 text-center">
        Generator 1 Logs
      </h5>

      {/* generator logs component  */}
      <Generator generatorLogs={generatorLogs} />
    </div>
  );
};

export default Home;
