import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import { fetchAllUserAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from '../../../utils/LoadingComponent'

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state?.users)
  const { usersList , appErr, serverErr , loading , userBlocked , userUnblocked} = users;

  useEffect(()=>{
    dispatch(fetchAllUserAction())
  },[userBlocked , userUnblocked])

  
  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {appErr || serverErr ? <h1 className="text-lg text-center text-red-500">{serverErr} {appErr}</h1>: null}
        <UsersListHeader />
       {loading ? <div className="text-center"><LoadingComponent/></div>  : 
       usersList?.length <=0 ? <h1 className="text-lg text-center">No user found</h1>:
       usersList?.map(user => (
      <div class="container px-4 mx-auto">
        <UsersListItem  user={user}/>
      </div>
       ))
        }
      </section>
    </>
  );
};

export default UsersList;
