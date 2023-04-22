import React from "react";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";

const Navbar = () => {

    //get user from store 
    const state = useSelector(state=> state.users)
    const {userAuth } = state
    const isAdmin = userAuth?.isAdmin;
  
    //account verification
    const account = useSelector(state=> state?.accVerification)
    const {loading , appErr , serverErr , token} = account
  return (
    <>
    {isAdmin ? (<AdminNavbar isLogin={userAuth}/>): userAuth ? (<PrivateNavbar isLogin={userAuth}/>) :  (<PublicNavbar/>) }
    
      {/*display alert  */}
      {userAuth && !userAuth?.isAccountVerified &&  <AccountVerificationAlertWarning/> }
      
      {loading && <h1 className="text-center">Sending Email to verify Account</h1>}
      {token && <AccountVerificationSuccessAlert/>}
      {appErr || serverErr ? <h1 className="text-center text-lg text-red-500">{serverErr} {appErr}</h1>:null}
    </>
  );
};

export default Navbar;

