import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React, { useCallback, useEffect } from "react";

export default function SingleProduct({ product, quantity, onQuantityChange ,onRemove }) {
 
  function handleChange(e) {
    onQuantityChange(product.id , +e.target.value);
  }

  function RemoveProduct(){
    onRemove(product.id);
  }

  return  (
    <>
      <div className=" text-gray-600 font-bold xl:hidden bg-white">
        <div className="flex justify-end border-2 border-b-0 p-2">
          <AiOutlineCloseCircle className="text-3xl hover:text-red-500 hover:cursor-pointer" onClick={RemoveProduct}/>
        </div>

        <div className="flex justify-center border-2 border-b-0 p-2 sm:hidden">
          <img src={product.thumbnail} className="h-16 w-16" alt="" />
        </div>
        <div className="flex justify-between border-2 border-b-0 p-2">
          <p>Product:</p>
          <p className="text-red-400">{product.title}</p>
        </div>
        <div className="flex justify-between border-2 border-b-0 p-2">
          <p>Price:</p>
          <p>${product.price}.00</p>
        </div>
        <div className="flex justify-between border-2 border-b-0 p-2">
          <p>Quantity:</p>
          <input type="number" value={quantity} onChange={handleChange} className="border-2 w-12" />
        </div>
        <div className="flex justify-between border-2  p-2">
          <p>Subtotal:</p>
          <p>${quantity * product.price}</p>
        </div>
      </div>

      <div className="hidden xl:block border-b-2">
        <div className=" flex space-x-10 justify-between  items-center max-w-5xl mx-auto bg-white pt-2 pb-2 pl-4 pr-4 text-gray-500 font-bold">
          <div className="flex justify-between w-1/2 items-center">
            <AiOutlineCloseCircle className="text-3xl hover:text-red-500 hover:cursor-pointer"  onClick={RemoveProduct}/>
            <img src={product.thumbnail} className="h-12 w-12" alt="" />
            <p className="w-1/2">{product.title}</p>
          </div>

          <p>${product.price}.00</p>
          <input
            onChange={handleChange}
            type="number"
            value={quantity}
            min="1"
            className="w-16 border-2"
          />
          <p>${quantity * product.price}</p>
        </div>
      </div>
    </>
  );
}
