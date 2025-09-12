import React, { useContext, useState } from "react";
import axios from "axios";
import { EmployeeContext, EnvContext } from "../../App";

export default function Login({ onSuccess }) {
  const [employeeCode, setEmployeeCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { base_api_url } = useContext(EnvContext);
  const { setToken } = useContext(EmployeeContext);

  const validate = () => {
    if (!employeeCode && employeeCode !== 0) {
      setError("Employee code is required");
      return false;
    }
    if (!/^\d+$/.test(String(employeeCode))) {
      setError("Employee code must be a number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${base_api_url}/api/login/employee`, {
        employeeCode: Number(employeeCode),
      });
      // success response handling (adjust according to your API)
      if (res.data && res.data.success) {
        setToken(res.data.token);
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response.status === 404) {
        setError(err.response?.data?.message);
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-red-500">SNEHA</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hatchery Management — Employee Login
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="employeeCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee code
            </label>

            <input
              id="employeeCode"
              name="employeeCode"
              type="number"
              inputMode="numeric"
              autoComplete="on"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
              className={`block w-full rounded-lg border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition ${
                error ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Enter your employee code"
              aria-invalid={!!error}
              aria-describedby={error ? "employeeCode-error" : undefined}
            />
            {error && (
              <p
                id="employeeCode-error"
                className="mt-2 text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold shadow-sm transition ${
              loading
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center text-xs text-gray-400">
            By logging in you agree to follow Hatchery operational guidelines.
          </div>
        </form>
      </div>
    </div>
  );
}
