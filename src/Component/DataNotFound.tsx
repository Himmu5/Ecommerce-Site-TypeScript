import React from "react";
import MainContant from "./MainContant";
import { Link } from "react-router-dom";
import { memo } from "react";

function DataNotFound() {
  return (
    <div className=" sm:h-screen flex flex-col justify-center items-center bg-white mt-10 mb-10 pb-10">
      <div className="sm:flex justify-center gap-2 ">
        <img
          src="https://cdn.discordapp.com/attachments/1010741357431750817/1016659803201867806/3819552.jpg"
          className="sm:w-1/3 self-center"
          alt=""
        />
        <div className="flex flex-col items-center space-y-4 text-5xl sm:space-y-12 justify-center sm:w-1/2 ">
          <h1 className=" font-bold ">Oops!</h1>
          <h1 className="text-orange-500">404 ERROR</h1>
          <p className="text-center text-xl sm:text-2xl"> Error: Sorry, No data available at this scale in this area</p>
        </div>
      </div>

      <div className="pl-4 pr-4 pt-2 pb-2 text-xl bg-blue-600 text-white  rounded-lg hover:bg-red-300 ">
        <Link to="/" element={<MainContant />}>
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default memo(DataNotFound);