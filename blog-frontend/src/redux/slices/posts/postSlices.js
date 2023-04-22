import { createAsyncThunk, createSlice , createAction} from '@reduxjs/toolkit';

import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';
//redirect action
export const resetPost = createAction("post/reset");
export const resetPostEdit = createAction("post/resetedit");
export const resetPostDelete = createAction("post/resetdelete");

// create post action



export const createPostAction = createAsyncThunk(
    'post/created', async (post , {rejectWithValue, getState,dispatch})=>{
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
        const formData = new FormData();
        formData.append('title', post?.title)
        formData.append('category', post?.category)
        formData.append('description', post?.description)
        formData.append('image', post?.image)
        const {data} = await axios.post(`${baseURL}posts`, formData, config)

        //dispatch reset action
         dispatch(resetPost())
        
        
         return data
      } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
      }
})

//fetch all post action

export const fetchPostsAction = createAsyncThunk(
  'post/list', async (category , {rejectWithValue, getState,dispatch})=>{
  


    try {
      //http call
      
      const {data} = await axios.get(`${baseURL}posts/fetch/all/posts?category=${category}`)

     
      
      
       return data
    } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
    }
})

//add likes to the post

export const toggleAddLikesToPost = createAsyncThunk(
  'post/like', async( postId, {rejectWithValue, getState, dispatch})=>{
                // get user token
                 const user = getState()?.users;
                 const {userAuth} = user;
                 //console.log(userAuth.token)
                 
      const config = {
        headers:{
            Authorization: `Bearer ${userAuth?.token}`
        }
      }
      //http call
      try {
        const {data} = await axios.put(`${baseURL}posts/like/post` , {postId}, config)
        return data;
      } catch (error) {
        if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
      }
  })


  //add dislikes to the post

export const toggleAddDislikesToPost = createAsyncThunk(
  'post/dislike', async( postId, {rejectWithValue, getState, dispatch})=>{
                // get user token
                 const user = getState()?.users;
                 const {userAuth} = user;
                 //console.log(userAuth.token)
                 
      const config = {
        headers:{
            Authorization: `Bearer ${userAuth?.token}`
        }
      }
      //http call
      try {
        const {data} = await axios.put(`${baseURL}posts/dislike/post` , {postId}, config)
        return data;
      } catch (error) {
        if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
      }
  })



  //fetch single post by id action

export const fetchPostAction = createAsyncThunk(
  'post/detail', async (postId , {rejectWithValue, getState,dispatch})=>{
  


    try {
      //http call
      
      const {data} = await axios.get(`${baseURL}posts/fetch/post/${postId}`)

     
      
      
       return data
    } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
    }
})


// update post action 

export const updatePostAction = createAsyncThunk(
    'post/update', async (post , {rejectWithValue, getState,dispatch})=>{
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
        
        const {data} = await axios.put(`${baseURL}posts/update/post/${post?.id}`, post, config)
        dispatch(resetPostEdit())
        
         return data
      } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
      }
})


 //delete post by id action

 export const deletePostAction = createAsyncThunk(
  'post/delete', async (postId , {rejectWithValue, getState,dispatch})=>{
  
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
      
      const {data} = await axios.delete(`${baseURL}posts/delete/post/${postId}` , config)

       //dispatch reset action
       dispatch(resetPostDelete())
      
      
       return data
    } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
    }
})

//slices


const postSlice = createSlice({
    name:'post',
    initialState: { },
    extraReducers: (builder)=>{
      // create post
            builder.addCase(createPostAction.pending, (state, action)=>{
                state.loading = true;
            }) 
            builder.addCase(resetPost, (state, action)=>{
              state.isCreated = true;
            })
            builder.addCase(createPostAction.fulfilled, (state, action)=>{
                state.postCreated = action.payload;
                state.loading = false;
                state.isCreated = false;
                state.appErr = undefined ;
                state.serverErr = undefined;
            }) 
            builder.addCase(createPostAction.rejected, (state, action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message ;
                state.serverErr = action?.error?.message;
            }) 

            //fetch posts
            builder.addCase(fetchPostsAction.pending, (state, action)=>{
              state.loading = true;
          }) 
         
          builder.addCase(fetchPostsAction.fulfilled, (state, action)=>{
              state.postLists = action.payload;
              state.loading = false;
              
              state.appErr = undefined ;
              state.serverErr = undefined;
          }) 
          builder.addCase(fetchPostsAction.rejected, (state, action)=>{
              state.loading = false;
              state.appErr = action?.payload?.message ;
              state.serverErr = action?.error?.message;
          }) 

          //like posts
          builder.addCase(toggleAddLikesToPost.pending, (state, action)=>{
            state.loading = true;
        }) 
       
        builder.addCase(toggleAddLikesToPost.fulfilled, (state, action)=>{
            state.likes = action.payload;
            state.loading = false;
            
            state.appErr = undefined ;
            state.serverErr = undefined;
        }) 
        builder.addCase(toggleAddLikesToPost.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message;
        }) 

         //dislike posts
         builder.addCase(toggleAddDislikesToPost.pending, (state, action)=>{
          state.loading = true;
      }) 
     
      builder.addCase(toggleAddDislikesToPost.fulfilled, (state, action)=>{
          state.disLikes = action.payload;
          state.loading = false;
          
          state.appErr = undefined ;
          state.serverErr = undefined;
      }) 
      builder.addCase(toggleAddDislikesToPost.rejected, (state, action)=>{
          state.loading = false;
          state.appErr = action?.payload?.message ;
          state.serverErr = action?.error?.message;
      }) 



       //fetch single posts
       builder.addCase(fetchPostAction.pending, (state, action)=>{
        state.loading = true;
    }) 
   
    builder.addCase(fetchPostAction.fulfilled, (state, action)=>{
        state.postDetails = action.payload;
        state.loading = false;
        
        state.appErr = undefined ;
        state.serverErr = undefined;
    }) 
    builder.addCase(fetchPostAction.rejected, (state, action)=>{
        state.loading = false;
        state.appErr = action?.payload?.message ;
        state.serverErr = action?.error?.message;
    }) 

      // update post
      builder.addCase(updatePostAction.pending, (state, action)=>{
        state.loading = true;
    }) 
    builder.addCase(resetPostEdit, (state, action)=>{
      state.isUpdated = true;
  }) 
   
    
    builder.addCase(updatePostAction.fulfilled, (state, action)=>{
        state.postUpdated = action.payload;
        state.isUpdated = false;
        state.loading = false;
        state.appErr = undefined ;
        state.serverErr = undefined;
    }) 
    builder.addCase(updatePostAction.rejected, (state, action)=>{
        state.loading = false;
        state.appErr = action?.payload?.message ;
        state.serverErr = action?.error?.message;
    }) 


    //delete post
    builder.addCase(deletePostAction.pending, (state, action)=>{
      state.loading = true;
  }) 
  builder.addCase(resetPostDelete, (state, action)=>{
    state.isDeleted = true;
  })
 
  builder.addCase(deletePostAction.fulfilled, (state, action)=>{
      state.postDeleted = action.payload;
      state.isDeleted = false;
      state.loading = false;
      
      state.appErr = undefined ;
      state.serverErr = undefined;
  }) 
  builder.addCase(deletePostAction.rejected, (state, action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message ;
      state.serverErr = action?.error?.message;
  }) 

    }
})




export default postSlice.reducer;