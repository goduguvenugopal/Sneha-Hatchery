import React from "react";
import { CustomLoading } from "../components/Loading";

const Generator = ({ generatorLogs, areLogs }) => {
  if (areLogs) {
    return (<CustomLoading customHeight={"h-[30vh]"}/>)
  }
  return (
    <>
      {/* generatorLogs Table */}
      {generatorLogs.length > 0 ? (
        <div className="overflow-x-auto overflow-y-auto h-[70vh] text-nowrap ">
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
                <th className="px-4 py-2 border">First Employee</th>
                <th className="px-4 py-2 border">Second Employee</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {generatorLogs.map((log, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">
                    {new Date(log?.logDate).toDateString()}
                  </td>
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
                  <td className="px-4 py-2 border">{log.firstEmpName}</td>
                  <td className="px-4 py-2 border">
                    {log.secondEmpName || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-[1rem] font-semibold h-[30vh] flex items-center justify-center">
          <h5>No Logs</h5>
        </div>
      )}
    </>
  );
};

export default Generator;
