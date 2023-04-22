import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer  from "../slices/category/categorySlice"
import post from "../slices/posts/postSlices";
import commentReducer from "../slices/comments/commentSlices";
import emailReducer from "../slices/email/emailSlices";
import accVerificationReducer from "../slices/accountVerification/accVerificationSlices"
const store = configureStore({
    reducer:{
        users: usersReducer,
        category: categoriesReducer,
        post,
        comment: commentReducer,
        sendEmail: emailReducer,
        accVerification: accVerificationReducer
    },
})




export default store;