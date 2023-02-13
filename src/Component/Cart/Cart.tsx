import React, { memo, FC } from "react";
import ProductList from "./ProductList";
import SearchNotFound from "../Error-Component/SearchNotFound";
import { withCart } from "../Provider/WithProvider";
import CartTotalP from "./CartTotal";
import { ResponseType } from "../CommenType/Types";

type CartType = {
  totalproduct: ResponseType[];
};

const Cart: FC<CartType> = ({ totalproduct }) => {
  // if (loading) {
  //   return <Loading />
  // }

  if (totalproduct?.length == 0) {
    return <SearchNotFound />;
  }
  

  return (
    <>
      <div className=" max-w-5xl mx-auto font-bold text-gray-500 bg-white p-3 mt-10 mb-10 xl:p-10 shadow-xl ">
        <ProductList />
        <div className="flex flex-col items-end ">
          <CartTotalP />
        </div>
      </div>
    </>
  );
};

export default withCart(memo(Cart));
