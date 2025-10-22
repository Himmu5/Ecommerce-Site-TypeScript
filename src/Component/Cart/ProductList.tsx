import React, { useEffect ,FC } from "react";
import SingleProducts from "./SingleProduct";
import { useState } from "react";
import { withCart } from "../Provider/WithProvider";
import { ResponseType ,CartType } from '../CommenType/Types'

type ProductListType = {
  totalproduct: ResponseType[],
  updateCart :(C:CartType)=>void;
}

const ProductList:FC<ProductListType> = ({ totalproduct, updateCart })=> {
  
  const [quantityMap, setQuantityMap] = useState<CartType>({});
  
  const cartToQuantityMap = () =>
    totalproduct.reduce((m, cartItem) => {
      return { ...m, [cartItem.product.id]: cartItem.quantity };
    }, {});

  useEffect(
    function () {
      setQuantityMap(cartToQuantityMap());
    },
    [totalproduct]
  );

  function handleRemove(productid:number) {
    const newQuantityMap = { ...quantityMap };
    delete newQuantityMap[productid];
    updateCart(newQuantityMap);
  }

  function handleChange(productId:number, newValue:number) {
    const newLocalCart = { ...quantityMap, [productId]: newValue };
    setQuantityMap(newLocalCart);
  }

  function updateMyCart() {
    updateCart(quantityMap);
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table Header */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 py-4 px-6 bg-gray-50 rounded-lg text-sm font-semibold text-gray-600">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Subtotal</div>
      </div>

      {/* Cart Items */}
      {totalproduct.map(function (item) {
        return (
          <SingleProducts
            key={item.product.id}
            onRemove={handleRemove}
            onQuantityChange={handleChange}
            product={item.product}
            quantity={quantityMap[item.product.id]}
          />
        );
      })}

      {/* Coupon and Update Cart */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 pt-6 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200">
            APPLY COUPON
          </button>
        </div>
        <button
          onClick={updateMyCart}
          className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          UPDATE CART
        </button>
      </div>
    </div>
  );
}
export default withCart(ProductList);
