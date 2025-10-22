import React, { useState, useEffect, FC, ReactNode } from "react";
import { UserContext } from "../Context/Context";
import Loading from "../Cards/Loading";
import axios from "axios";

type UserProviderType = {
  children: ReactNode;
};

type User = {
  id:number;
  full_name:string;
  email:string;
}

const UserProvider: FC<UserProviderType> = ({ children }) => {
  const [user, setUser] = useState<User>();

  console.log(
    "🚀 ~ file: UserProvider.tsx ~ line 10 ~ UserProvider ~ user",
    user
  );

  const [loading, setLoading] = useState<boolean>(true);

  const localToken = localStorage.getItem("token");
  useEffect(() => {
    if (localToken) {
      // For DummyJSON, we'll store user data in localStorage since there's no /me endpoint
      // The user data is stored when they login/signup
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing stored user:', e);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        // If no user data found, clear token
        localStorage.removeItem("token");
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <UserContext.Provider value={{ isLoggedIn: !!localToken , user, setUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
