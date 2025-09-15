import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-white  border-t-4 border-r-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export const SmallLoading = () => {
  return (
    <div className="animate-spin rounded-full h-7 w-7 border-4 border-t-white  border-t-4 border-r-4 border-blue-500 border-solid"></div>
  );
};

export const CustomLoading = ({ customHeight }) => {
  return (
    <div className={`flex justify-center items-center  ${customHeight}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-white  border-t-4 border-r-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export const FlipkartSpin = () => {
  return (
    <div className="w-screen z-10 bg-gray-500 bg-opacity-15  h-screen fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-white p-2 rounded-full">
        <div className="animate-spin rounded-full h-7 w-7 border-4 border-t-white  border-t-4 border-r-4 border-blue-500 border-solid"></div>
      </div>
    </div>
  );
};

export const SmallCardLoader = ({ title }) => {
  return (
    <div className="fixed w-full top-0 left-0 h-screen  flex justify-center items-center">
      <div className="bg-gray-300 text-gray-800 shadow-lg w-fit p-5 rounded font-bold flex justify-center gap-2 items-center">
        <SmallLoading /> {title}
      </div>
    </div>
  );
};
