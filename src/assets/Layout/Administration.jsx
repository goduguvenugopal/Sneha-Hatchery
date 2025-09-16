import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EmployeeContext, EnvContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { CustomLoading, SmallCardLoader } from "../components/Loading";
import { toast } from "react-toastify";
import { InputModal } from "../components/Modal";

const Administration = () => {
  const { token, employeeData } = useContext(EmployeeContext);
  const { base_api_url } = useContext(EnvContext);
  const [employees, setEmployees] = useState([]);
  const [empLoader, setEmpLoader] = useState(true);
  const [delSpin, setDelSpin] = useState(false);
  const [permission, setPermission] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  // delete employee
  const deleteEmployee = async (id) => {
    const isOkay = confirm(
      "Employee will be deleted permanently, are you sure ?"
    );
    if (!isOkay) return;
    try {
      setDelSpin(true);
      const res = await axios.delete(
        `${base_api_url}/api/delete/single/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    } finally {
      setDelSpin(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [token]);

  // password checking to give access Administration page

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeData?.password === parseInt(password)) {
      setPermission(true);
      sessionStorage.setItem("permission", JSON.stringify(true));
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  useEffect(() => {
    const isPermission = sessionStorage.getItem("permission");
    if (isPermission) {
      setPermission(JSON.parse(isPermission));
    }
  }, []);

  if (!permission) {
    return (
      <InputModal
        password={password}
        handleSubmit={handleSubmit}
        error={error}
        setPassword={setPassword}
      />
    );
  }

  return (
    <div className="pt-4 p-3">
      <div className="text-center pt-5 pb-3  mb-6 sticky top-[4rem] bg-white left-0">
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          Employee Administration
        </h1>
        <hr className="border-gray-400 my-4" />
        {/* Header */}
        <Link
          to="/administration/registeremployee"
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
                        <Link to={`/administration/updateemployee/${emp._id}`} className="text-green-600  cursor-pointer hover:text-green-800">
                          <FaEdit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteEmployee(emp._id)}
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

      {/* delete employ loader  */}
      {delSpin && <SmallCardLoader title={"Deleting.."} />}
    </div>
  );
};

export default Administration;
