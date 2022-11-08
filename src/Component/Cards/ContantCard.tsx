import React from "react";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { memo } from "react";

function ContantCard({ data }) {
  return (
    <div className="p-3 shadow-md">
    

      <div className=" aspect-square overflow-hidden">
        <img
          className="h-full w-full object-cover hover:scale-105"
          src={data.thumbnail}
          alt=""
        />
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-gray-400 ">{data.category}</p>
        <h1 className="font-bold  text-gray-800">{data.title}</h1>
        <div className="flex">
          <FcRating />
          <FcRating />
          <FcRating />
          <FcRating />
          <FcRating />
        </div>
        <div className="sm:flex sm:justify-between text-red-400 ">
          <p className="font-bold text-sm text-gray-800">${data.price}.00</p>
          <Link to={"/Component/Cards/Card/" + data.id} className="underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ContantCard);
