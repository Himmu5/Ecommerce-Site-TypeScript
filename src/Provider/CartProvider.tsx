import React, { useEffect, useState } from "react";
import { withUser } from "../Component/WithProvider";
import { CartContext } from "../Context";
import { saveCart } from "../Component/Api";
import { getCart } from "../Component/Api";
import { getProductByIds } from "../Component/Api";

function CartProvider({ children, isLoggedIn }) {
  const [totalproduct, settotalproduct] = useState([]);
 

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

  function quantityMapToCart(quantityMap) {
    getProductByIds(Object.keys(quantityMap)).then((response) => {
      console.log("🚀 ~ file: CartProvider.jsx ~ line 28 ~ getProductByIds ~ response", response)
      const savedCart = response.data.map((p) => ({
        product: p,
        quantity: quantityMap[p.id],
      }));
      settotalproduct(savedCart);
    });
  }

  function updateCart(quantityMap) {
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
  function addToCart(productId, count) {
    const quantityMap = totalproduct.reduce((m, cartItem) => {
      return { ...m, [cartItem.product.id]: cartItem.quantity };
    }, {});

    const olddata = quantityMap[productId] || 0;
    const newCart = { ...quantityMap, [productId]: +count + +olddata };
    updateCart(newCart);
  }

  let CartTotal = totalproduct.reduce((output, current) => {
    return output + +current.quantity;
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
