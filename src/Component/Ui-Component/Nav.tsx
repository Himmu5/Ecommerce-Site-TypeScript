import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import HamMenu from "./Hamburgur/HamMenu";
import { memo } from "react";
import Hamburger from "hamburger-react";
import WithUser from "../HOCs/WithUser";
import { withCart } from "../Provider/WithProvider";
import { IoIosArrowDown } from "react-icons/io";
import { User } from "../CommenType/Types";

type NavType = {
  CartTotal: number;
  setUser: (user: User | undefined) => void;
  user?: User;
};

const Nav: FC<NavType> = ({ CartTotal, setUser, user }) => {
console.log("🚀 ~ file: Nav.tsx ~ line 19 ~ user", user)

  const [hamtoggle, sethamtoggle] = useState(false);

  function Toggle() {
    if (hamtoggle == true) {
      sethamtoggle(false);
    } else {
      sethamtoggle(true);
    }
  }

  function LogOut() {
    setUser(undefined);
    localStorage.removeItem("token");
  }

  return (
    <div className="font-bold text-gray-600 ">
      <div className=" bg-white pt-6 pb-4 pl-3 pr-3 shadow-md ">
        <div className="flex justify-between items-center  max-w-6xl mx-auto">
          <Link to="/">
            <img
              src={"https://cdn.discordapp.com/attachments/1005675922403360880/1218544033543094353/logoShop.jpg?ex=66080c91&is=65f59791&hm=b1a0583f437aee96d0780f3959062ce9e8cb1a6188a8678145ba2bbf2ea5ba5a&"}
              alt="logo"
              className="h-10 object-cover"
            />
          </Link>
          <div className="flex  items-center space-x-8">
            <div className="hidden md:block  duration-500">
              <div className=" flex space-x-6">
                <Link to="/">
                  <p className="hover:text-red-400 hover:scale-105">HOME</p>
                </Link>
                <Link to={"/AllProducts"} className="hover:text-red-400 hover:scale-105">
                  ALL PRODUCTS
                </Link>
                <Link className="hover:text-red-400 hover:scale-105 " to="/About">ABOUT</Link>
                <Link to="/Contact" className="hover:text-red-400 hover:scale-105">CONTACT</Link>
                <div className=" flex flex-col relative group ">
                  <div className="flex gap-1 items-center hover:text-red-400  hover:scale-105 ">
                    ACCOUNT <IoIosArrowDown />
                  </div>
                  <div className="hidden group-hover:flex text-md z-20  flex-col absolute border px-6 py-3 mt-6 bg-white ">
                    <Link
                      to="/component/validation/SignIn"
                      className="hover:text-red-500"
                    >
                      Account
                    </Link>
                    <Link
                      to="/component/Cart/Cart"
                      className="hover:text-red-500"
                    >
                      Cart
                    </Link>
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
};

export default withCart(WithUser(memo(Nav)));
