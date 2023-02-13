import React, {FC, useEffect, useState } from "react";
import { withUser } from "./WithProvider"; 
import { CartContext } from "../Context/Context";
import { saveCart } from "../Api";
import { getCart } from "../Api";
import { getProductByIds } from "../Api";
import {ResponseType ,CartType,Product} from '../CommenType/Types'

type CartProviderType ={
  children:React.ReactNode,
  isLoggedIn:boolean
}

const CartProvider:FC<CartProviderType>=({ children, isLoggedIn })=> {

  const [totalproduct, settotalproduct] = useState<ResponseType[]>([]);
  console.log("🚀 ~ file: CartProvider.tsx ~ line 10 ~ CartProvider ~ totalproduct", totalproduct)
 

  useEffect(() => {
    if (!isLoggedIn) {
      let SavedData = JSON.parse(localStorage.getItem("my-cart") || "{}");
      quantityMapToCart(SavedData);
    } else {
      getCart().then((saveData) => {
        settotalproduct(saveData);
      });
    }
  }, [isLoggedIn]);

  function quantityMapToCart(quantityMap:CartType) {
    getProductByIds(Object.keys(quantityMap)).then((response) => {
      console.log("🚀 ~ file: CartProvider.jsx ~ line 28 ~ getProductByIds ~ response", response.data )
      const savedCart = response.data.map((p:Product) => ({
        product: p,
        quantity: quantityMap[p.id],
      }));
      settotalproduct(savedCart);
    });
  }

  function updateCart(quantityMap:CartType) {
    if (!isLoggedIn) {
      const quantityMapString = JSON.stringify(quantityMap);
      localStorage.setItem("my-cart", quantityMapString);
      quantityMapToCart(quantityMap);
    } else {
      saveCart(quantityMap).then(()=>{
        quantityMapToCart(quantityMap)
      })

    }
  }
  function addToCart(productId:number, count:number) {
    const quantityMap:CartType = totalproduct.reduce((m, cartItem) => {
      return { ...m, [cartItem.product.id]: cartItem.quantity };
    }, {});

    const olddata:number = quantityMap[productId] || 0;
    const newCart = { ...quantityMap, [productId]: +count + +olddata };
    updateCart(newCart);
  }

  let CartTotal = totalproduct.reduce((output:number, current:ResponseType) => {
    return output + + current.quantity;
  }, 0);

  return (
    <div>
      <CartContext.Provider
        value={{ totalproduct, CartTotal, updateCart, addToCart }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default withUser(CartProvider);
