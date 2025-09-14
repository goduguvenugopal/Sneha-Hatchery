// src/components/EmployeeAccountModal.jsx
import React, { useContext } from "react";
import { EmployeeContext } from "../../App";
import { toast } from "react-toastify";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { usePushNotifications } from "../utils/usePushNotifications";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { employeeData, setToken } = useContext(EmployeeContext);
  const { subscribeUser, unsubscribeUser, isSubscribed, subscription } =
    usePushNotifications();
  const navigate = useNavigate();

  if (!employeeData?.employeeName) {
    return <Loading />;
  }
  return (
    <div className="p-3 w-full">
      <div className="w-full  ">
        {/* Top card */}
        <div className="bg-violet-500 text-white px-6 py-6 rounded-xl">
          <div className="flex flex-col items-center">
            {/* avatar */}
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3 text-2xl font-bold">
              {employeeData.employeeName?.[0] || "E"}
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold capitalize">
                {employeeData.employeeName}
              </div>
            </div>

            {/* notificaton button section  */}
            {!isSubscribed ? (
              <button
                onClick={subscribeUser}
                className="mt-4 cursor-pointer bg-black flex items-center gap-2 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <FaBell /> Notification ON
              </button>
            ) : (
              <button
                onClick={unsubscribeUser}
                className="mt-4 cursor-pointer bg-black flex items-center gap-2 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <FaBellSlash /> Notification OFF
              </button>
            )}
          </div>
        </div>

        {/* Employee Details Section */}
        <div className="p-4 bg-white min-h-fit">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
            Employee Details
          </h2>

          {/* Info */}
          <div className="space-y-2 text-gray-700">
            <div>
              <span className="font-medium">Employee Code:</span>{" "}
              {employeeData.employeeCode}
            </div>
            <div>
              <span className="font-medium">Designation:</span>{" "}
              {employeeData.designation}
            </div>
            <div>
              <span className="font-medium">Mobile:</span> 📞{" "}
              {employeeData.mobile}
            </div>
            <div>
              <span className="font-medium">Address:</span>{" "}
              {employeeData.address}
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-3  left-0 fixed bottom-5 text-center w-full">
            <button
              onClick={() => {
                const isOkay = confirm("You will be logged out, are you sure?");
                if (isOkay) {
                  sessionStorage.removeItem("employeeToken");
                  setToken("");
                  toast.success("Logged out successfully");
                  navigate("/");
                }
              }}
              className="px-4 w-[130px] cursor-pointer py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
