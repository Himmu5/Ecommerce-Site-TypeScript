import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import WithUser from "../../HOCs/WithUser";
import { User } from "../../CommenType/Types";

type HemMenuType = {
  user?: User;
  LogOut: () => void;
} 

const HamMenu: FC<HemMenuType> = ({  user, LogOut }) => {
 
  return (
    <div className="border-2 sm:hidden  bg-white">
      {user && (
        <div className="pl-3 pt-1 pb-1  duration-500 border-b-2 hover:text-red-500">
          USER NAME : {user.full_name && user.full_name.toUpperCase()}
        </div>
      )}
      <Link to={"/"} className="pl-3 pt-1 pb-1  duration-500 border-b-2 hover:text-red-500">
        Home
      </Link>
      <Link to={"/AllProducts"} className="border-b-2 pl-3 pt-1 pb-1  duration-500 hover:text-red-500">
        ALL PRODUCTS
      </Link>
      <div className="border-b-2 pl-3 pt-1 pb-1  duration-500 hover:text-red-500">
        ABOUT
      </div>
      <div className="border-b-2 pl-3 pt-1 pb-1  duration-500 hover:text-red-500">
        CONTACT
      </div>
      <Link
        to="/component/validation/SignIn"
        className="pl-3  duration-500 pt-1 pb-1 hover:text-red-500"
      >
        ACCOUNT
      </Link>
      {user && (
        <p
          className="border-t-2 pl-3 pt-1 pb-1 hover:text-red-500 hover:cursor-pointer"
          onClick={LogOut}
        >
          Log Out
        </p>
      )}
    </div>
  );
};

export default WithUser(memo(HamMenu));
