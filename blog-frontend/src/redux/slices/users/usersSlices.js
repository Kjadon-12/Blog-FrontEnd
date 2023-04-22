import { createAsyncThunk  , createSlice , createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";


//redirect action

const resetProfilePhotoAction = createAction("profilePhoto/reset")
const resetProfileFormAction = createAction("profileForm/reset")
const resetPasswordAction = createAction("passwordupdate/reset")
// register action

export const registerUserAction = createAsyncThunk(
    'users/register',                        //this action type
     async ( user, {rejectWithValue, getState, dispatch})=>{ //in this line user is payload

        try {
            //http call
           const config = {
            headers:{
                'Content-Type': 'application/json'
            },
           }
           const res = await axios.post(`${baseURL}users/register` , user, config)  // user is payload(fname,lname,email,password)
           return res.data  
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})



//login action
export const loginUserAction = createAsyncThunk(
    'user/login',
    async (userData,{rejectWithValue,getState,dispatch})=>{
      const config ={
        headers:{
            "Content-Type": "application/json"
        }
      }

      try {
        //http call
        const {data}= await axios.post(`${baseURL}users/login`, userData, config)

        //save user data into localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data;
      }
      
      
      
      catch (error) {
        if(!error?.response){
          throw error
        } 
        return rejectWithValue(error?.response?.data) 
      }
    }
)



//Profile action

export const userProfileAction = createAsyncThunk(
  "user/profile", async (id, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
      const {data} = await axios.get(`${baseURL}users/profile/${id}`  , config)
     
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})


// upload Profile photo action

export const uploadProfilePhotoAction = createAsyncThunk(
  "upload/profile", async (uploadimg, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    const formData = new FormData();
    formData.append('image', uploadimg?.image)
     
    
    const {data} = await axios.put(`${baseURL}users/profilephoto-upload` , formData  , config)
    dispatch(resetProfilePhotoAction())
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})

// update profile form

export const updateProfileFormAction = createAsyncThunk(
  "update/profile-form", async (userData, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.put(`${baseURL}users/${userAuth?._id}` , userData , config)
       dispatch(resetProfileFormAction())
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})


// fetch single user details

export const fetchDetailsUserAction = createAsyncThunk(
  "fetch/detail-user", async (id, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.get(`${baseURL}users/${id}`  , config)
    
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})


// fetch all users 

export const fetchAllUserAction = createAsyncThunk(
  "user/list", async (id, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.get(`${baseURL}users/`, config)
    
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})

// block user

export const blockUserAction = createAsyncThunk(
  "user/block", async (id, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.put(`${baseURL}users/block-user/${id}`, {}, config)
    
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})


// Unblock user

export const unBlockUserAction = createAsyncThunk(
  "user/unblock", async (id, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.put(`${baseURL}users/unblock-user/${id}`, {}, config)
    
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})








//follow action

export const followUserAction = createAsyncThunk(
  "user/follow", async (userToFollowId, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
      const {data} = await axios.put(`${baseURL}users/follow` ,{followId: userToFollowId}, config)
     
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})



// unFollow
export const unfollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (unFollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseURL}users/unfollow`,
        { unFollowId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


// update password

export const updatePasswordAction = createAsyncThunk(
  "update/password", async (password, {rejectWithValue, getState,dispatch})=>{
  // get user token
  const user = getState()?.users;
  const {userAuth} = user;
  //console.log(userAuth.token)
    //http call
    const config = {
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      }
    }
   try {
    
    const {data} = await axios.put(`${baseURL}users/password` , password , config)
       dispatch(resetPasswordAction())
      return data;
   } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
   }
})


//Password reset token generator
export const passwordResetTokenAction = createAsyncThunk(
  "password/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseURL}users/forget-password-token`,
        { email },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Password reset
export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseURL}users/forget-password-reset`,
        { newPassword: user?.password, token: user?.token },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);



//get user from local storage and place into store
const userLoginFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;


//logout action 

export const logoutAction = createAsyncThunk(
  'user/logout' , async (payload, {rejectWithValue, getState, dispatch})=>{
                try {
                   localStorage.removeItem("userInfo")
                } catch (error) {
                  if(!error?.response){
                       throw error
                  }
                  return rejectWithValue(error?.response?.data)
                }
})







//slices

const usersSlices = createSlice({
    name: 'users',
    initialState:{
        userAuth: userLoginFromLocalStorage
    },
    extraReducers: (builder)=> {
        //register 
        builder.addCase(registerUserAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(registerUserAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.registerd = action?.payload
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(registerUserAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //login


        builder.addCase(loginUserAction.pending , (state, action) => {
          state.loading = true;
          state.appErr = undefined;
          state.serverErr = undefined;
        })
        builder.addCase(loginUserAction.fulfilled, (state,action)=>{
          state.loading = false;
          state.userAuth = action?.payload
          state.appErr = undefined;
         state.serverErr = undefined;
     })
     builder.addCase(loginUserAction.rejected, (state,action)=>{
      //console.log(action.payload)
      
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
  })

  //profile
  builder.addCase(userProfileAction.pending, (state,action)=>{
    state.loading = true;
    state.appErr = undefined;
    state.serverErr = undefined;
})
builder.addCase(userProfileAction.fulfilled, (state,action)=>{
     state.loading = false;
     state.profile = action?.payload
     state.appErr = undefined;
    state.serverErr = undefined;
})
builder.addCase(userProfileAction.rejected, (state,action)=>{
    //console.log(action.payload)
    
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
})

//upload profile photo
builder.addCase(uploadProfilePhotoAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
  
})
 //dispatch for redirect
 builder.addCase(resetProfilePhotoAction, (state,action)=>{
  state.isProfilePhotoUploaded = true;
})
builder.addCase(uploadProfilePhotoAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.profilePhoto = action?.payload
   state.isProfilePhotoUploaded = false;
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(uploadProfilePhotoAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})



//update profile form
builder.addCase(updateProfileFormAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
  
})
 //dispatch for redirect
 builder.addCase(resetProfileFormAction, (state,action)=>{
  state.isProfileFormUpdated = true;
})
builder.addCase(updateProfileFormAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.updatedProfileForm = action?.payload
   state.isProfileFormUpdated = false;
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(updateProfileFormAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})



//fetch user detail
builder.addCase(fetchDetailsUserAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(fetchDetailsUserAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.userDetails = action?.payload
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(fetchDetailsUserAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})


//fetch all user
builder.addCase(fetchAllUserAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(fetchAllUserAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.usersList = action?.payload
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(fetchAllUserAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})

//block
builder.addCase(blockUserAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(blockUserAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.userBlocked = action?.payload
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(blockUserAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})

//unblock
builder.addCase(unBlockUserAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(unBlockUserAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.userUnblocked = action?.payload
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(unBlockUserAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})

//follow
builder.addCase(followUserAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(followUserAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.followed = action?.payload
   state.unFollowed = undefined;
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(followUserAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.unFollowed = undefined;
  state.serverErr = action?.error?.message;
})


//user unFollow
builder.addCase(unfollowUserAction.pending, (state, action) => {
  state.unfollowLoading = true;
  state.unFollowedAppErr = undefined;
  state.unfollowServerErr = undefined;
});
builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
  state.unfollowLoading = false;
  state.unFollowed = action?.payload;
  state.followed = undefined;
  state.unFollowedAppErr = undefined;
  state.unfollowServerErr = undefined;
});
builder.addCase(unfollowUserAction.rejected, (state, action) => {
  state.unfollowLoading = false;
  state.unFollowedAppErr = action?.payload?.message;
  state.unfollowServerErr = action?.error?.message;
});


//update password
builder.addCase(updatePasswordAction.pending, (state,action)=>{
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(resetPasswordAction, (state,action)=>{
  state.isPasswordUpdated = true;
  
})
builder.addCase(updatePasswordAction.fulfilled, (state,action)=>{
   state.loading = false;
   state.updatedPassword = action?.payload
   state.isPasswordUpdated = false;
   state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(updatePasswordAction.rejected, (state,action)=>{
  //console.log(action.payload)
  
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
})

 //Password reset token generator
 builder.addCase(passwordResetTokenAction.pending, (state, action) => {
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
  state.loading = false;
  state.passwordToken = action?.payload;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
});

//Password reset
builder.addCase(passwordResetAction.pending, (state, action) => {
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(passwordResetAction.fulfilled, (state, action) => {
  state.loading = false;
  state.passwordReset = action?.payload;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(passwordResetAction.rejected, (state, action) => {
  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;
});


  //logout 
  builder.addCase(logoutAction.pending , (state,action) => {
    state.loading = false;
  })
  builder.addCase(logoutAction.fulfilled , (state,action) => {
    state.userAuth = undefined;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
  })
  builder.addCase(logoutAction.rejected , (state,action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
  })



  

    }
})



export default usersSlices.reducer