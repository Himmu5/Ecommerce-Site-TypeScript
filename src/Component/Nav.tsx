import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import HamMenu from "../Hamburgur/HamMenu";
import { memo } from "react";
import Hamburger from "hamburger-react";
import WithUser from "../WithUser";
import { withCart } from "./WithProvider";
import { IoIosArrowDown } from "react-icons/io";

function Nav({ total, CartTotal, setUser, user }) {
  const [hamtoggle, sethamtoggle] = useState(false);

  function Toggle() {
    if (hamtoggle == true) {
      sethamtoggle(false);
    } else {
      sethamtoggle(true);
    }
  }

  function LogOut() {
    setUser();
    localStorage.removeItem("token");
  }

  return (
    <div className="">
      <div className=" bg-white pt-6 pb-6  pl-3 pr-3 shadow-md ">
        <div className="flex justify-between items-center  max-w-6xl mx-auto">
          <Link to="/">
            <img
              src="https://trycasuals.com/wp-content/uploads/2019/06/print-1-1.svg"
              alt=""
            />
          </Link>
          <div className="flex  items-center space-x-8">
            <div className="hidden md:block  duration-500">
              <div className=" flex space-x-6">
                <Link to="/">
                  <p className="hover:text-red-400 hover:scale-105">HOME</p>
                </Link>
                <p className="hover:text-red-400 hover:scale-105">
                  ALL PRODUCTS
                </p>
                <p className="hover:text-red-400 hover:scale-105">ABOUT</p>
                <p className="hover:text-red-400 hover:scale-105">CONTACT</p>
                <div className=" flex flex-col relative group ">
                  <div className="flex gap-1 items-center hover:text-red-400  hover:scale-105 ">
                    ACCOUNT <IoIosArrowDown />
                  </div>
                  <div className="hidden group-hover:flex text-md z-20  flex-col absolute border px-6 py-3 mt-6 bg-white ">
                    <Link to="/component/validation/SignIn" className="hover:text-red-500">Account</Link>
                    <Link to="/component/Cart/Cart" className="hover:text-red-500">Cart</Link>
                  </div>
                </div>

                {user && (
                  <p
                    className="hover:text-red-400 hover:scale-105 hover:cursor-pointer font-bold "
                    onClick={LogOut}
                  >
                    Log Out
                  </p>
                )}
                {/* <p>Log Out</p> */}
              </div>
            </div>
            <Link
              to="/component/Cart/Cart"
              className="hover:bg-white hover:text-red-500"
            >
              <span className="absolute ml-8 pl-1 pr-1 text-white bg-red-400 rounded-xl self-end  hover:bg-white hover:text-red-500">
                {CartTotal}
              </span>
              <BiCart className="text-5xl " />
            </Link>

            <div onClick={Toggle} className="sm:hidden">
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
      <div className="transition-all duration-500 ">
        {hamtoggle && <HamMenu LogOut={LogOut} />}
      </div>
    </div>
  );
}

export default withCart(WithUser(memo(Nav)));
