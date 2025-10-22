import React, { useState, useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsHeart, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import {FC, memo } from "react";
import { Product } from '../CommenType/Types'
import convertImageUrl from "../../util/Converter";
import { WishlistContext } from '../Context/Context';

type ContantCardType = {
  data:Product
}

const ContantCard:FC<ContantCardType>=({ data })=> {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  
  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={convertImageUrl(data?.thumbnail)}
          alt={data.title}
        />
        
        {/* Overlay with actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center`}>
          <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2`}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isInWishlist && isInWishlist(data.id)) {
                  removeFromWishlist && removeFromWishlist(data.id);
                } else {
                  addToWishlist && addToWishlist(data.id);
                }
              }}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isInWishlist && isInWishlist(data.id) 
                  ? "bg-red-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
            >
              <BsHeart size={16} />
            </button>
            <button className="bg-white text-gray-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
              <BsEye size={16} />
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {data.category}
          </span>
        </div>

        {/* Sale badge */}
        {data.id % 3 === 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
          {data.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <AiFillStar key={i} className="text-yellow-400 text-sm" />
          ))}
          <span className="text-gray-500 text-sm ml-1">(4.8)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${data.price}</span>
            <span className="text-sm text-gray-500 line-through">${(data.price * 1.2).toFixed(0)}</span>
          </div>
          
          <Link 
            to={"/Component/Cards/Card/" + data.id}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ContantCard);
