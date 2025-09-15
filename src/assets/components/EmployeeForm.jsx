import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeContext, EnvContext } from "../../App";

const EmployeeForm = () => {
  const { token } = useContext(EmployeeContext);
  const { base_api_url } = useContext(EnvContext);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeCode: "",
    designation: "",
    mobile: "",
    password: "",
    address: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   add employee function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(
        `${base_api_url}/api/add/employee`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          employeeName: "",
          employeeCode: "",
          designation: "",
          mobile: "",
          password: "",
          address: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Name */}
        <div>
          <label className="block text-sm font-medium">Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2  mt-2"
          />
        </div>

        {/* Employee Code */}
        <div>
          <label className="block text-sm font-medium">Employee Code</label>
          <input
            type="number"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            required
            className="w-full border rounded p-2  mt-2"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mt-2"
          >
            <option value="">Select</option>
            <option value="worker">Worker</option>
            <option value="supervisor">Supervisor</option>
            <option value="incharge">Incharge</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium">Mobile</label>
          <input
            type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full border rounded p-2  mt-2"
          />
        </div>

        {/* Password */}
        {["incharge", "manager"].includes(formData.designation) && (
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="number"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2  mt-2"
            />
          </div>
        )}

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2  mt-2"
          />
        </div>
        {loader ? (
          <button
            type="button"
            className="w-full bg-blue-600 pointer-events-none text-white py-2 rounded hover:bg-blue-700"
          >
            Submitting...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Employee
          </button>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
