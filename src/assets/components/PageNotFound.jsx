import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-7xl font-extrabold text-sky-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white font-medium bg-sky-600 hover:bg-sky-700 rounded-lg shadow transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
