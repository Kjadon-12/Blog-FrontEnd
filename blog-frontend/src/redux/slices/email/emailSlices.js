import { createAsyncThunk  , createSlice , createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";


// custom action for redirect
const resetEmailAction = createAction("mail/reset");






// Send Email
export const sendEmailAction = createAsyncThunk(
    'send/email',                        //this action type
     async ( email , {rejectWithValue, getState, dispatch})=>{ 
           //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
        try {
            //http call

           const res = await axios.post(`${baseURL}email` ,{to:email?.recipientEmail, subject: email?.subject, message: email?.message} , config)  
          //dispatch redirect action

          dispatch(resetEmailAction());
           return res.data  
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})



// slices

const emailSlices = createSlice({
    name: 'send-email',
    initialState:{ },
    extraReducers: (builder)=> {
        //register 
        builder.addCase(sendEmailAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(resetEmailAction, (state,action)=>{
            state.isEmailSent = true;
            
        })
        
        builder.addCase(sendEmailAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.email = action?.payload
             state.isEmailSent = false;
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(sendEmailAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default emailSlices.reducer