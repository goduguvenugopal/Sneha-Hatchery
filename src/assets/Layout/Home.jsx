import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import axios from "axios";
import { EmployeeContext, EnvContext } from "../../App";
import { toast } from "react-toastify";
import Generator from "./Generator";
import Footer from "./Footer";

const Home = ({ loader }) => {
  const { base_api_url } = useContext(EnvContext);
  const { token, employeeData } = useContext(EmployeeContext);
  const [generatorLogsOne, setGeneratorLogsOne] = useState([]);
  const [generatorLogs, setGeneratorLogs] = useState(generatorLogsOne);
  const [areLogs, setAreLogs] = useState(false);
  const [runningGen, setRunningGen] = useState({});
  const [generatorId, setGeneratorId] = useState(null);
  const [genStartLoad, setGenStartLoad] = useState(false);
  const [genStopLoad, setGenStopLoad] = useState(false);

  // get generator logs
  const fetchGeneratorLogs = async () => {
    try {
      setAreLogs(true);
      const res = await axios.get(`${base_api_url}/api/generator/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setGeneratorLogs(res.data?.data);
        setGeneratorLogsOne(res.data?.data);
        setRunningGen(res.data?.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAreLogs(false);
    }
  };

  useEffect(() => {
    // if token is available call function
    if (token) {
      fetchGeneratorLogs();
    }
  }, [token]);

  // start generator
  const startGenerator = async () => {
    if (runningGen?.status === "on") {
      return toast.info(
        `Please Stop the generator ${runningGen?.generatorId} first then start other generator`
      );
    }
    if (generatorId === null) {
      return toast.info("Please Select Generator 1 or 2");
    }
    try {
      setGenStartLoad(true);
      const res = await axios.post(
        `${base_api_url}/api/generator/start`,
        {
          employeeCode: employeeData?.employeeCode,
          generatorId,
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
        setGeneratorId(null);
        fetchGeneratorLogs();
      }
    } catch (error) {
      console.error(error);
      toast.error("Generator is not started Please try again");
    } finally {
      setGenStartLoad(false);
    }
  };

  // stop generator
  const stopGenerator = async () => {
    if (runningGen?.status === "off") {
      return toast.info(
        `Generator ${runningGen?.generatorId} has already stopped`
      );
    }
    try {
      setGenStopLoad(true);
      const res = await axios.put(
        `${base_api_url}/api/generator/stop/${runningGen._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
        fetchGeneratorLogs();
        setGeneratorId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Generator is not stopped please try again");
    } finally {
      setGenStopLoad(false);
    }
  };

  useEffect(() => {
    const results = generatorLogsOne.filter(
      (log) => log.generatorId === generatorId
    );
    setGeneratorLogs(results);
  }, [generatorId]);

  if (loader) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="pt-8 p-3">
        <h5 className="text-[1.2rem] lg:text-[1.3rem]   font-bold text-gray-700 text-center">
          Generator Tracking Management
        </h5>

        {/* here generator push buttons to show status green and red colors  */}
        <div className="flex justify-center gap-4 mt-8">
          {/* Start Button */}
          {genStartLoad ? (
            <button className="w-20 h-20 rounded-full text-[0.9rem] cursor-pointer bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 active:scale-95 transition">
              Starting..
            </button>
          ) : (
            <button
              onClick={startGenerator}
              className="w-20 h-20 rounded-full cursor-pointer bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 active:scale-95 transition"
            >
              Start
            </button>
          )}
          <div className="flex flex-col items-center justify-center ">
            <h5 className="font-bold">GEN</h5>
            <h5 className="font-bold text-[1.2rem]">{generatorId}</h5>
          </div>
          {/* Stop Button */}

          {genStopLoad ? (
            <button className="w-20 h-20 text-[0.9rem] rounded-full cursor-pointer bg-red-500 text-white font-bold text-lg shadow-lg hover:bg-red-600 active:scale-95 transition">
              Stopping..
            </button>
          ) : (
            <button
              onClick={stopGenerator}
              className="w-20 h-20 rounded-full cursor-pointer bg-red-500 text-white font-bold text-lg shadow-lg hover:bg-red-600 active:scale-95 transition"
            >
              Stop
            </button>
          )}
        </div>

        {/* Generator Status Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          {/* generator 1 buttons  */}
          {runningGen?.status === "on" && runningGen?.generatorId === 1 ? (
            <button
              onClick={() => setGeneratorId(1)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white font-medium shadow"
            >
              Generator 1 - ON
            </button>
          ) : (
            <button
              onClick={() => setGeneratorId(1)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 text-white font-medium shadow"
            >
              Generator 1 - OFF
            </button>
          )}

          {/* generator 2 buttons  */}
          {runningGen?.status === "on" && runningGen?.generatorId === 2 ? (
            <button
              onClick={() => setGeneratorId(2)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white font-medium shadow"
            >
              Generator 2 - ON
            </button>
          ) : (
            <button
              onClick={() => setGeneratorId(2)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 text-white font-medium shadow"
            >
              Generator 2 - OFF
            </button>
          )}
        </div>

        <h5 className="text-[1.2rem] lg:text-[1.3rem] my-5  font-bold text-gray-700 text-center">
         {generatorId === null && "All"} Generator {generatorId} Logs
        </h5>

        {/* generator logs component  */}
        <Generator
          generatorLogs={generatorLogs}
          areLogs={areLogs}
          generatorId={generatorId}
          runningGen={runningGen}
        />
      </div>

      <Footer />
    </>
  );
};

export default Home;
