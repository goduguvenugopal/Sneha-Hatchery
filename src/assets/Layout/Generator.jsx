import React, { useEffect, useRef, useState } from "react";
import { CustomLoading } from "../components/Loading";
import { toast } from "react-toastify";

const Generator = ({ generatorLogs, areLogs, generatorId }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [genLogs, setGenLogs] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    setGenLogs(generatorLogs);
  }, [generatorLogs]);

  // Convert "DD/MM/YYYY" to "YYYY-MM-DD"
  function convertToISO(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // filter logs by date function
  function filterLogsByDateRange(fromDate, toDate) {
    if (!fromDate || !toDate) {
      return toast.info("Please Select From Date and To Date");
    }
    const from = new Date(fromDate); // YYYY-MM-DD → Date
    const to = new Date(toDate);

    const filtered = generatorLogs.filter((log) => {
      // Convert backend log date (DD/MM/YYYY → ISO → Date)
      const logISO = convertToISO(log.logDate);
      const logDate = new Date(logISO);

      return logDate >= from && logDate <= to;
    });

    setGenLogs(filtered); // ✅ update state with filtered array
  }

  // print function
  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const newWin = window.open("", "", "width=900,height=650");
    newWin.document.write(`
      <html>
        <head>
          <title>${`Lalgadi Malakpet ${
            generatorId === null ? "All" : ""
          } Generator ${
            generatorId === null ? "All" : generatorId
          } Logs`}</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #555;
              padding: 8px;
              text-align: center;
            }
            th {
              background: #f1f1f1;
            }
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  if (areLogs) {
    return <CustomLoading customHeight={"h-[30vh]"} />;
  }
  return (
    <>
      {/* generatorLogs Table */}
      {genLogs.length > 0 ? (
        <>
          <div
            ref={tableRef}
            className="overflow-x-auto overflow-y-auto max-h-[70vh] text-nowrap "
          >
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
                {genLogs.map((log, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">{log?.logDate}</td>
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
        </>
      ) : (
        <div className="text-center text-[1rem] font-semibold h-[30vh] flex items-center justify-center">
          <h5>No Logs</h5>
        </div>
      )}

      {/* print table logs section  */}
      <div className="mt-5 pt-5 text-center ">
        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-6 ">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              To Date
            </label>
            <input
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => filterLogsByDateRange(fromDate, toDate)}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Get Logs
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
                setGenLogs(generatorLogs);
              }}
              className="w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* print button  */}
        <button
          onClick={handlePrint}
          className="bg-gray-800 cursor-pointer hover:bg-gray-900 text-white font-medium py-2 px-5 rounded-lg transition"
        >
          Print Logs
        </button>
      </div>
    </>
  );
};

export default Generator;
