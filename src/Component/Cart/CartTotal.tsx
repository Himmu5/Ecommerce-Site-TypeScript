import React, { FC } from "react";
import { memo } from "react";
import { ResponseType } from "../CommenType/Types";
import { withCart } from "../Provider/WithProvider";

type P = {
  totalproduct : ResponseType[]
}

const CartTotal:FC<P> = ({totalproduct  }) => {

  
  const totalPrice = totalproduct.reduce((prev ,current)=>{
    return prev + current.product.price * current.quantity
  },0)

  console.log("🚀 ~ file: CartTotal.tsx:10 ~ cart", totalPrice)

  return (
    <div className="space-y-2 border-2 mt-5 pb-5 w-80">
        <div>

        </div>
      <div className="p-3 text-2xl border-b-2">
        <p>Cart totals</p>
      </div>
      <div className="p-3 space-y-4">
        <div className="flex justify-between border-b-2">
          <p>Subtotal:</p>
          <p>${totalPrice}.00</p>
        </div>
        <div className="flex justify-between border-b-2">
          <p>Total:</p>
          <p>${totalPrice}.00</p>
        </div>
      </div>

      <div className="bg-red-500 text-white text-center pt-3 pb-3 rounded-md m-2">
        ADD TO CHECKOUT
      </div>
    </div>
  );
}


export default withCart(memo(CartTotal));