import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation,  } from 'react-router-dom';




const ProtectedAdminRoute = ({children}) => {


    //check if user logged in
const user = useSelector(state=>state?.users);
const {userAuth} = user;

let location = useLocation();

if(userAuth?.isAdmin) {
    return children
    
}
return <Navigate to="/login" state={{ from: location}} replace />



  }

export default ProtectedAdminRoute;