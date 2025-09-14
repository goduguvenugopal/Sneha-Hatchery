import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EmployeeContext, EnvContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { CustomLoading } from "../components/Loading";

const Administration = () => {
  const { token } = useContext(EmployeeContext);
  const { base_api_url } = useContext(EnvContext);
  const [employees, setEmployees] = useState([]);
  const [empLoader, setEmpLoader] = useState(true);

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // fetch all employees
  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${base_api_url}/api/get/all/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        setEmployees(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmpLoader(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [token]);

  return (
    <div className="pt-4 p-3">
      <div className="text-center pt-5 pb-3  mb-6 sticky top-[4rem] bg-white left-0">
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          Employee Administration
        </h1>
        <hr className="border-gray-400 my-4" />
        {/* Header */}
        <Link
          to="/employeeform"
          className="bg-blue-600 cursor-pointer  text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Register Employee
        </Link>
      </div>

      {empLoader ? (
        <div className="text-center py-10 flex items-center justify-center gap-2">
          <CustomLoading />{" "}
          <h5 className="font-bold">Fectching Employees...</h5>
        </div>
      ) : (
        <>
          {employees.length > 0 ? (
            <>
              {/* Employee Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {employees.map((emp) => (
                  <div
                    key={emp._id}
                    className="border rounded-lg shadow-md bg-white overflow-hidden pb-2"
                  >
                    {/* Card Header */}
                    <div className="bg-gray-100 px-2 py-2 flex justify-between items-center">
                      <h2 className="font-semibold text-gray-800 capitalize">
                        {emp.designation}
                      </h2>
                      <div className="flex gap-3">
                        <button className="text-green-600 cursor-pointer hover:text-green-800">
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="text-red-600 cursor-pointer hover:text-red-800"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-2 mt-1">
                      <p className="text-lg font-medium capitalize">
                        {emp.employeeName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Mobile: {emp.mobile}
                      </p>
                      <p className="text-sm text-gray-600 my-1">
                        Employee Code: {emp.employeeCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        Address: {emp.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center font-bold mt-10 pt-10">
              <h5>No Employees</h5>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Administration;
