import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from './Context'
import WithUser from './WithUser';

function UserRoute({children , user }) {

    if(!user){
      return <Navigate to={"/component/validation/SignIn"} />;
    }  

  return children;
}
export default WithUser(UserRoute);