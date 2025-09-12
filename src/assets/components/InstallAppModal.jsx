import React from "react";
import { FaDownload, FaShareSquare } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const InstallAppModal = ({ setInstallApp }) => {
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
      <main className="fixed top-0 left-0 p-3 h-screen w-screen  z-20 flex justify-center items-center">
        <section className="container mb-7 px-5 py-10 mx-auto flex items-center md:flex-row flex-col rounded-2xl bg-gray-800 lg:w-[50%] relative">
          <span
            className="bg-black rounded text-white cursor-pointer absolute top-2 right-2 p-1"
            onClick={() => setInstallApp(false)}
          >
            <MdClose size={22} />
          </span>
          <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
            <h2 className="text-xs text-red-500 tracking-widest font-medium title-font mb-1">
              SNEHA
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
    </>
  );
};

export default InstallAppModal;
