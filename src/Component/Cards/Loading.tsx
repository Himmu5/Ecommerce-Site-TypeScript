import React from "react";
import { memo } from "react";
import {RiLoaderLine} from 'react-icons/ri'

 function Loading() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen text-6xl  text-red-500 ">
      <div className="">

      <RiLoaderLine className="animate-spin"/>
      </div>
    </div>
  );
}


export default memo(Loading);


