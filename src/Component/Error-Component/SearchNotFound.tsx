import React, { memo } from "react";
import { Link } from "react-router-dom";

 function SearchNotFound() {
  return (
    <div className="flex flex-col justify-center items-center pb-2 h-screen  space-y-5 bg-white max-w-5xl mx-4  sm:mx-40 my-10">
      <div className=" text-gray-400 text-center text-3xl sm:text-5xl ">No Product Found</div>
      <Link to='/' className="px-4 py-2 bg-red-400 hover:bg-red-300 rounded-md text-white">Back to Home </Link>
    </div>
  );
}

export default memo(SearchNotFound);
