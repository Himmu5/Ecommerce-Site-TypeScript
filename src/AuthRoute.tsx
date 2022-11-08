import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom';
import {UserContext} from './Context'
import WithUser from './WithUser';


 function AuthRoute({children , user}) {

  if(user){
    return <Navigate to={"/"} />;
  }  
  return children;
}

export default WithUser(AuthRoute);