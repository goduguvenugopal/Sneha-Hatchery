import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-3 mt-10 ">
      <div className="container mx-auto text-center text-sm px-3">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://goduguvenugopal.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Developed By Venu Gopal
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
