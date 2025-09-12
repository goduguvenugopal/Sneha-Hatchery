import React from "react";

const Home = () => {
  // Dummy data (replace with API call)
  const logs = [
    {
      logDate: "2025-09-12",
      shift: "A",
      empId: "EMP001",
      onTime: "2025-09-12T08:00:00",
      offTime: "2025-09-12T10:30:00",
      duration: 150,
      generatorId: 1,
      status: "on",
      fisrtEmpName: "Ravi",
      secondEmpName: "Suresh",
      employeeCode: 123,
    },
    {
      logDate: "2025-09-12",
      shift: "C",
      empId: "EMP002",
      onTime: "2025-09-12T22:00:00",
      offTime: null,
      duration: null,
      generatorId: 2,
      status: "off",
      fisrtEmpName: "Anil",
      secondEmpName: "",
      employeeCode: 124,
    },
  ];
  return (
    <div className="pt-8 p-3">
      <h5 className="text-[1.2rem] lg:text-[1.3rem]   font-bold text-gray-700 text-center">
        Generator Tracking Mangement
      </h5>

      {/* here generator push buttons to show status green and red colors  */}
      <div className="flex justify-center gap-8 mt-10">
        {/* Start Button */}
        <button className="w-20 h-20 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 active:scale-95 transition">
          Start
        </button>

        {/* Stop Button */}
        <button className="w-20 h-20 rounded-full bg-red-300 text-white font-bold text-lg shadow-lg hover:bg-red-600 active:scale-95 transition">
          Stop
        </button>
      </div>

      {/* Generator Status Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow">
          Generator 1 - ON
        </button>
        <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow">
          Generator 2 - OFF
        </button>
      </div>

      <h5 className="text-[1.2rem] lg:text-[1.3rem] mt-10  font-bold text-gray-700 text-center">
        Generator 1 Logs
      </h5>

      {/* Logs Table */}
      <div className="overflow-x-auto  text-nowrap">
        <table className="min-w-full border border-gray-300 bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border ">Log Date</th>
              <th className="px-4 py-2 border">Shift</th>
              <th className="px-4 py-2 border">On Time</th>
              <th className="px-4 py-2 border">Off Time</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Generator</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">First Emp Name</th>
              <th className="px-4 py-2 border">Second Emp Name</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {logs.map((log, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{log.logDate}</td>
                <td className="px-4 py-2 border">{log.shift}</td>

                <td className="px-4 py-2 border">
                  {new Date(log.onTime).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border">
                  {log.offTime
                    ? new Date(log.offTime).toLocaleTimeString()
                    : "—"}
                </td>
                <td className="px-4 py-2 border">
                  {log.duration !== null ? log.duration : "—"}
                </td>
                <td className="px-4 py-2 border">{log.generatorId}</td>
                <td
                  className={`px-4 py-2 border font-bold ${
                    log.status === "on" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {log.status.toUpperCase()}
                </td>
                <td className="px-4 py-2 border">{log.fisrtEmpName}</td>
                <td className="px-4 py-2 border">{log.secondEmpName || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
