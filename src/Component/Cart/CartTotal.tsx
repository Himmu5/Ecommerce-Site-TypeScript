import React from "react";
import { memo } from "react";

function CartTotal() {
  return (
    <div className="space-y-2 border-2 mt-5 pb-5">
        <div>

        </div>
      <div className="p-3 text-2xl border-b-2">
        <p>Cart totals</p>
      </div>
      <div className="p-3 space-y-4">
        <div className="flex justify-between border-b-2">
          <p>Subtotal:</p>
          <p>$14.00</p>
        </div>
        <div className="flex justify-between border-b-2">
          <p>Total:</p>
          <p>$14.00</p>
        </div>
      </div>

      <div className="bg-red-500 text-white text-center pt-3 pb-3 rounded-md m-2">
        ADD TO CHECKOUT
      </div>
    </div>
  );
}


export default memo(CartTotal);