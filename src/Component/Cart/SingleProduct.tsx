import { useState ,ChangeEvent } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React, {FC, useCallback, useEffect } from "react";
import {Product} from '../CommenType/Types'
import convertImageUrl from "../../util/Converter";

type SigleProduct = {
  product:Product,
  quantity:number,
  onQuantityChange:(id:number , value:number)=>void;
  onRemove:(id:number)=>void;
}

const SingleProduct:FC<SigleProduct> = ({ product, quantity, onQuantityChange ,onRemove })=> {
 
  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    onQuantityChange(product.id , +e.target.value);
  }

  function RemoveProduct(){
    onRemove(product.id);
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <img 
              src={convertImageUrl(product.thumbnail)} 
              className="h-16 w-16 object-cover rounded-lg" 
              alt={product.title} 
            />
            <div>
              <h3 className="font-semibold text-gray-900">{product.title}</h3>
              <p className="text-sm text-gray-600">${product.price}.00</p>
            </div>
          </div>
          <button onClick={RemoveProduct} className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            <AiOutlineCloseCircle size={24} />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Quantity:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleChange} 
              min="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Subtotal:</p>
            <p className="font-semibold text-gray-900">${(quantity * product.price).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center space-x-4">
          <button onClick={RemoveProduct} className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            <AiOutlineCloseCircle size={20} />
          </button>
          <img 
            src={convertImageUrl(product.thumbnail)} 
            className="h-12 w-12 object-cover rounded-lg" 
            alt={product.title} 
          />
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
        </div>
        
        <div className="col-span-2 text-center">
          <p className="font-semibold text-gray-900">${product.price}.00</p>
        </div>
        
        <div className="col-span-2 text-center">
          <input
            onChange={handleChange}
            type="number"
            value={quantity}
            min="1"
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        
        <div className="col-span-2 text-center">
          <p className="font-semibold text-gray-900">${(quantity * product.price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;