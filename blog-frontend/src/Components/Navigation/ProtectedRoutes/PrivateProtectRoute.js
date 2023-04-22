import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation,  } from 'react-router-dom';




const PrivateProtectRoute = ({children}) => {


    //check if user logged in
const user = useSelector(state=>state?.users);
const {userAuth} = user;

let location = useLocation();

if(userAuth) {
    return children
    
}
return <Navigate to="/login" state={{ from: location}} replace />



  }

export default PrivateProtectRoute