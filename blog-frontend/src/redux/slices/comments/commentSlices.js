import { createAsyncThunk, createSlice , createAction} from '@reduxjs/toolkit';

import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';


//Action to redirect

const resetCommentAction = createAction("comment/reset")

// create comment

export const createCommentAction = createAsyncThunk(

    'comment/created', async (comment , {rejectWithValue, getState,dispatch})=>{
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
            //http call
            
            const {data} = await axios.post(`${baseURL}comments`, comment , config)
      
           
            
            
             return data
          } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data)
          }
        })


        // delete comment 

export const deleteCommentAction = createAsyncThunk(

    'comment/delete', async (commentId , {rejectWithValue, getState,dispatch})=>{
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
            //http call
            
            const {data} = await axios.delete(`${baseURL}comments/delete/${commentId}` , config)
      
           
            
            
             return data
          } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data)
          }
        })



         // update comment 

export const updateCommentAction = createAsyncThunk(

    'comment/update', async (comment , {rejectWithValue, getState,dispatch})=>{
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
            //http call
            
            const {data} = await axios.put(`${baseURL}comments/update/${comment?.id}`, {description: comment?.description} , config)
      
            dispatch(resetCommentAction())
            
            
             return data
          } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data)
          }
        })

// fetch single/ detail comment
 

 export const fetchSingleCommentAction = createAsyncThunk(

    'comment/detail', async (commentId , {rejectWithValue, getState,dispatch})=>{
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
            //http call
            
            const {data} = await axios.get(`${baseURL}comments/fetch/${commentId}` , config)
      
           
            
            
             return data
          } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data)
          }
        })




//slices 
const commentSlice = createSlice({
    name:'comment',
    initialState: { },
    extraReducers: (builder)=>{
      // create comment
            builder.addCase(createCommentAction.pending, (state, action)=>{
                state.loading = true;
            }) 
           
        
            builder.addCase(createCommentAction.fulfilled, (state, action)=>{
                state.commentCreated = action.payload;
                state.loading = false;
                
                state.appErr = undefined ;
                state.serverErr = undefined;
            }) 
            builder.addCase(createCommentAction.rejected, (state, action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message ;
                state.serverErr = action?.error?.message;
            }) 
      

             // delete comment
             builder.addCase(deleteCommentAction.pending, (state, action)=>{
                state.loading = true;
            }) 
           
        
            builder.addCase(deleteCommentAction.fulfilled, (state, action)=>{
                state.commentDeleted = action.payload;
                state.loading = false;
                
                state.appErr = undefined ;
                state.serverErr = undefined;
            }) 
            builder.addCase(deleteCommentAction.rejected, (state, action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message ;
                state.serverErr = action?.error?.message;
            }) 

            // update comment
            builder.addCase(updateCommentAction.pending, (state, action)=>{
                state.loading = true;
            }) 
           //dispatch for redirect
    builder.addCase(resetCommentAction, (state,action)=>{
        state.isUpdate = true;
  })
        
            builder.addCase(updateCommentAction.fulfilled, (state, action)=>{
                state.commentUpdated = action.payload;
                state.loading = false;
                state.isUpdate = false;
                state.appErr = undefined ;
                state.serverErr = undefined;
            }) 
            builder.addCase(updateCommentAction.rejected, (state, action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message ;
                state.serverErr = action?.error?.message;
            }) 

             // fetch single/detail comment
             builder.addCase(fetchSingleCommentAction.pending, (state, action)=>{
                state.loading = true;
            }) 
           
        
            builder.addCase(fetchSingleCommentAction.fulfilled, (state, action)=>{
                state.commentDetail = action.payload;
                state.loading = false;
                
                state.appErr = undefined ;
                state.serverErr = undefined;
            }) 
            builder.addCase(fetchSingleCommentAction.rejected, (state, action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message ;
                state.serverErr = action?.error?.message;
            }) 
      
      }
      })

      export default commentSlice.reducer;