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
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: localToken,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoading(false);
        });
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
