import React, { useEffect ,FC } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import WithProvider from "../Provider/WithProvider"; 
import {AlertContext} from '../Context/Context'
import {AlertType } from '../CommenType/Types'


type AlertProp={
  alert:AlertType ,
  RemoveAlert:()=>void;
}

let ErrorMap = {
  error: {
    color: "bg-red-500",
    Icon: MdOutlineDangerous,
  },
  success: {
    color: "bg-green-500",
    Icon: AiFillCheckCircle,
  },
};

const Alert:FC<AlertProp>=({ alert, RemoveAlert })=>{


  useEffect(() => {
    if (alert) {
      const dismissTimer = setTimeout(RemoveAlert, 3 * 1000);
      
      return function () {
        clearTimeout(dismissTimer);
      };
    }
  }, [alert]);

  
  if (!alert) {
    return <></>;
  }

  const { type, message } = alert;
  const { color, Icon } = ErrorMap[type as keyof typeof ErrorMap];
  

  return (
    <div>
      <div className="flex items-center justify-center px-4 my-2">
        <div
          role="alert"
          id="alert"
          className={
            "transition duration-150 ease-in-out w-full lg:w-11/12 mx-auto bg-white dark:bg-gray-800 shadow rounded flex flex-col py-4 md:py-0 items-center md:flex-row justify-between "
          }
        >
          <div className="flex flex-col items-center md:flex-row">
            <div
              className={
                "mr-3 p-4  rounded md:rounded-tr-none md:rounded-br-none text-white " +
                color
              }
            >
              {<Icon />}
            </div>
            <p className="mr-2 text-base font-bold text-gray-800 dark:text-gray-100 mt-2 md:my-0">
              {type}
            </p>
            <div className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block"></div>
            <p className="text-sm lg:text-base dark:text-gray-400 text-gray-600 lg:pt-1 xl:pt-0 sm:mb-0 mb-2 text-center sm:text-left">
              {message}
            </p>
          </div>
          <div className="flex xl:items-center lg:items-center sm:justify-end justify-center pr-4">
            <button
              onClick={RemoveAlert}
              className="focus:outline-none focus:text-gray-400 hover:text-gray-400 text-sm cursor-pointer text-gray-600 dark:text-gray-400"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export {Alert};

export default WithProvider(AlertContext)(Alert);
