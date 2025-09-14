import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaDownload, FaShareSquare } from "react-icons/fa";

import { MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { EmployeeContext } from "../../App";
import InstallAppModal from "../components/InstallAppModal";
import { usePushNotifications } from "../utils/usePushNotifications";

const Navbar = () => {
  const [offcanvas, setOffcanvas] = useState(false);
  const [installApp, setInstallApp] = useState(false);
  const { setToken } = useContext(EmployeeContext);
  const location = useLocation();
  const { subscribeUser } = usePushNotifications();

  useEffect(() => {
    subscribeUser();
  }, [subscribeUser]); // runs once if subscribeUser is wrapped with useCallback([])

  // active page text Highlight function
  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 " : "text-gray-800 ";

  useEffect(() => {
    // checking whether app installed or not
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("PWA is installed");
      setInstallApp(false);
    } else {
      console.log("PWA is not installed");
      setInstallApp(true);
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (offcanvas && !e.target.closest(".offcanvas-menu")) {
        setOffcanvas(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [offcanvas]);

  // share app function

  const shareApp = async () => {
    try {
      await navigator.share({
        url: "https://snehahatchery.vercel.app",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="bg-white font-semibold w-full shadow-md h-[4.5rem] flex justify-between pl-3 pr-4 sticky top-0 left-0 items-center 
         
        z-50"
      >
        {/* company logo section  */}
        <Link to="/" className="w-40">
          <h1 className="text-red-500 font-bold text-2xl">SNEHA</h1>
        </Link>

        {/* links for larger devices  */}
        <nav className=" hidden lg:block">
          <div className="flex gap-6 items-center">
            <Link
              to="/"
              className={`text-[1.2rem] flex items-center  hover:text-blue-600 gap-3  w-fit ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/administration"
              className={`text-[1.2rem] flex items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive(
                "/administration"
              )}`}
            >
              Administration
            </Link>
            <Link
              onClick={() => setOffcanvas(false)}
              to="/account"
              className={`text-[1.2rem] flex items-center   hover:text-blue-600  gap-3  w-fit ${isActive(
                "/account"
              )}`}
            >
              Account
            </Link>
           
            {/* <Link
              to="/contact"
              className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive(
                "/contact"
              )}`}
            >
              {" "}
              Contact us{" "}
            </Link> */}
          </div>
        </nav>

        {/* cart and bars seach icons section  */}
        <div className="flex items-center gap-6 lg:gap-8 ">
          <section className="hidden lg:block">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={shareApp}
                className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[8rem]"
              >
                <FaShareSquare className=" text-white" />
                Share
              </button>
              <a
                href="/SNEHA.apk"
                download="SNEHA.apk"
                className="text-[1.2rem] text-black h-10 hover:bg-yellow-600 bg-yellow-500 flex justify-center items-center gap-2 rounded-full w-fit  px-5"
              >
                <FaDownload /> Download
              </a>
            </div>
          </section>
          <FaBars
            size={25}
            title="open menu"
            className="text-black cursor-pointer lg:hidden"
            onClick={(e) => {
              setOffcanvas(true), e.stopPropagation();
            }}
          />
        </div>
      </div>

      {/* offcanvas  for small and larger devices*/}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`lg:hidden fixed z-10 top-16 left-0  w-screen lg:w-[30%]  transform transition-transform duration-300 ${
          offcanvas
            ? "translate-y-0 lg:translate-x-0"
            : "-translate-y-full lg:-translate-x-full"
        }`}
      >
        <div className="bg-white relative flex flex-col gap-4 p-5  h-full w-full shadow-md ">
          <Link
            onClick={() => setOffcanvas(false)}
            to="/"
            className={`text-[1.2rem] flex items-center lg:hidden  hover:text-blue-600  gap-3  w-fit ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>

          <Link
            onClick={() => setOffcanvas(false)}
            to="/administration"
            className={`text-[1.2rem] flex lg:hidden items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive(
              "/administration"
            )}`}
          >
            Administration
          </Link>
          <Link
            onClick={() => setOffcanvas(false)}
            to="/account"
            className={`text-[1.2rem] flex items-center  hover:text-blue-600  gap-3  w-fit ${isActive(
              "/account"
            )}`}
          >
            Account
          </Link>
          {/* <Link
              to="/contact"
              className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive(
                "/contact"
              )}`}
            >
              {" "}
              Contact us{" "}
            </Link> */}

         

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={shareApp}
              className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[7rem]"
            >
              <FaShareSquare className=" text-white" />
              Share
            </button>
            <a
              href="/SNEHA.apk"
              download="SNEHA.apk"
              className="text-[1.2rem] text-black h-10   hover:bg-yellow-600 bg-yellow-500 flex justify-center items-center gap-2 rounded-full w-fit  px-5"
            >
              <FaDownload /> Download
            </a>
          </div>
          <MdClose
            size={25}
            className="absolute right-5 cursor-pointer"
            onClick={() => setOffcanvas(false)}
          />
        </div>
      </div>
      {/* download app modal component  */}
      {installApp && <InstallAppModal setInstallApp={setInstallApp} />}
    </>
  );
};

export default Navbar;
