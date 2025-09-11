import React, { useContext, useEffect, useState } from "react";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {
  FaBars,
  FaDownload,
  FaHome,
  FaSearch,
  FaShareSquare,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {  toast } from "react-toastify";

const Navbar = () => {
 
  const [offcanvas, setOffcanvas] = useState(false);
  const [installApp, setInstallApp] = useState(false);
  const location = useLocation();
  const token = "d"

  // active page text Highlight function
  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 " : "lg:text-gray-800 ";

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
        url: "https://www.madlymart.com",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  
      <div
        className="bg-white font-semibold w-full shadow-md h-[4.5rem] flex justify-between pl-3 pr-4 fixed top-0 left-0 items-center 
         
        z-10"
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
            {token ? (
              <>
                <Link
                  to="/profile"
                  className={`text-[1.2rem] flex items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive("/profile")}`} 
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-[1.2rem] flex items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive("/login")}`} 
                   
                >
                  Profile
                </Link>
              </>
            )}
            <Link
              to="/shopall"
              className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/shopall")}`}
            >
              {" "}
              Shop All{" "}
            </Link>
            <Link
              to="/contact"
              className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/contact")}`}
            >
              {" "}
              Contact us{" "}
            </Link>
          </div>
        </nav>

        {/* cart and bars seach icons section  */}
        <div className="flex items-center gap-6 lg:gap-8 ">
          
          <FaBars
            size={25}
            title="open menu"
            className="text-black cursor-pointer"
            onClick={(e) => {
              setOffcanvas(true), e.stopPropagation();
            }}
          />
        </div>
      </div>

      {/* offcanvas  for small and larger devices*/}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`offcanvas-menu fixed z-50 top-0 left-0  h-screen w-screen lg:w-[30%] p-2 transform transition-transform duration-300 ${
          offcanvas ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-gray-700 relative flex flex-col gap-4 text-white p-5  h-full w-full rounded-lg">
          <Link
            onClick={() => setOffcanvas(false)}
            to="/"
            className={`text-[1.2rem] flex items-center lg:hidden  hover:text-blue-600  gap-3  w-fit ${isActive("/")}`} 
          >
            Home
          </Link>
          {token ? (
            <>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/profile"
                className={`text-[1.2rem] flex lg:hidden items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive("/profile")}`}
              >
                Profile
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/shopall"
                className={`text-[1.2rem] flex items-center lg:hidden w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/shopall")}`}
              >
                Shop All
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/orders"
                className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/orders")}`}
              >
                My Orders
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/contact"
                className={`text-[1.2rem] flex items-center lg:hidden  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive("/contact")}`}
              >
                Contact Us
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/shopall"
                className={`text-[1.2rem] flex items-center lg:hidden w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/shopall")}`}
              >
                Shop All
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/login"
                className={`text-[1.2rem] flex items-center  w-fit gap-[0.9rem]  hover:text-blue-600 ${isActive("/login")}`}
              >
                My Orders
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/login"
                className={`text-[1.2rem] flex lg:hidden items-center  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive("/login")} `}
              >
                Profile
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/contact"
                className={`text-[1.2rem] flex items-center lg:hidden  w-fit gap-[0.7rem]  hover:text-blue-600 ${isActive(
                  "/contact"
                )}`}
              >
                Contact Us
              </Link>
            </>
          )}

          {token ? (
            <div
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
                localStorage.removeItem("user");
                
                toast.success("logged out");
                setOffcanvas(false);
              }}
              to="/login"
              className={`text-[1.2rem] cursor-pointer flex items-center  w-fit   gap-[0.7rem]  hover:text-blue-600 ${isActive(
                "/login"
              )} `}
            >
              Log out
            </div>
          ) : (
            <>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/login"
                className={`text-[1.2rem] flex items-center  w-fit   gap-[0.7rem]  hover:text-blue-600 ${isActive(
                  "/"
                )}`}
              >
                Login
              </Link>
            </>
          )}

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={shareApp}
              className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[10rem]"
            >
              <FaShareSquare className=" text-white" />
              Share App
            </button>
            <a
              href="/MadlyMart.apk"
              download="MadlyMart.apk"
              className="text-[1.2rem] text-black h-10 hover:bg-gray-200 bg-gray-100 flex justify-center items-center gap-2 rounded-full w-fit  px-5"
            >
              <FaDownload /> Download App
            </a>
          </div>

          <MdClose
            size={25}
            className="absolute right-5 cursor-pointer"
            onClick={() => setOffcanvas(false)}
          />
        </div>
      </div>

      {/* download share app section  */}
      {!installApp && (
        <main className="fixed top-0 left-0 p-3 h-screen w-screen bg-black bg-opacity-55 z-20 flex justify-center items-center">
          <section className="container mb-7 px-5 py-10 mx-auto flex items-center md:flex-row flex-col rounded bg-gray-700 lg:w-[50%] relative">
            <span
              className="bg-black rounded text-white cursor-pointer absolute top-2 right-2 p-1"
              onClick={() => setInstallApp(false)}
            >
              <MdClose size={22} />
            </span>
            <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
              <h2 className="text-xs text-orange-300 tracking-widest font-medium title-font mb-1">
                SNEHA Hatchery
              </h2>
              <h1 className=" text-md font-medium title-font text-white">
                Download our app for a better experience! Get faster access,
                exclusive features, and more.
              </h1>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-3 w-full">
              <a
                href="/SnehaHatchery.apk"
                download="SnehaHatchery.apk"
                className="bg-gray-100 text-center h-10 inline-flex gap-2 text-black py-2 px-5 rounded-full items-center hover:bg-gray-200 focus:outline-none w-[11rem]"
              >
                <FaDownload className="w-4 h-4" />
                <span className="title-font font-medium">Download App</span>
              </a>
              <button
                onClick={shareApp}
                className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[11rem]"
              >
                <FaShareSquare className=" text-white" />
                Share App
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Navbar;
