import {  createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";

//Action to redirect

const resetEditAction = createAction("category/reset")


const resetDeleteAction = createAction("category/delete-reset")
const resetCategoryAction = createAction("category/created-reset")





//action create category

export const createCategoryAction = createAsyncThunk(
    "category/create", async (category, {rejectWithValue, getState,dispatch})=>{
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
        const {data} = await axios.post(`${baseURL}category` , {title: category?.title} , config)
        //dispatch action
        dispatch(resetCategoryAction())
        return data;
     } catch (error) {
        if(!error?.response){
            throw ErrorEvent;
        }
        return rejectWithValue(error?.response?.data)
     }
})


// fetch all categories action
export const fetchCategoriesAction = createAsyncThunk(
    "category/fetch", async (category, {rejectWithValue, getState,dispatch})=>{
        
        // get user token
           const user = getState()?.users;
           const {userAuth} = user;
        //http call 
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
        try {
            const {data} = await axios.get(`${baseURL}category/fetch/all` , config  )
        return data; 
        } catch (error) {
            if(!error?.response){
                throw ErrorEvent;
            }
            return rejectWithValue(error?.response?.data) 
        }
    })



    // fetch single category action
export const fetchSingleCategoryAction = createAsyncThunk(
    "category/fetchS", async (id, {rejectWithValue, getState,dispatch})=>{
        
        // get user token
           const user = getState()?.users;
           const {userAuth} = user;
        //http call 
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
        try {
            const {data} = await axios.get(`${baseURL}category/fetch/${id}` , config  )
        return data; 
        } catch (error) {
            if(!error?.response){
                throw ErrorEvent;
            }
            return rejectWithValue(error?.response?.data) 
        }
    })


    // update category action
export const updateCategoryAction = createAsyncThunk(
    "category/update", async (category, {rejectWithValue, getState,dispatch})=>{
        
        // get user token
           const user = getState()?.users;
           const {userAuth} = user;
        //http call 
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
        try {
            const {data} = await axios.put(`${baseURL}category/update/${category?.id}`, {title: category?.title} , config  )
        //dispatch action to reset the updated data
        dispatch(resetEditAction())
        
            return data; 
        } catch (error) {
            if(!error?.response){
                throw ErrorEvent;
            }
            return rejectWithValue(error?.response?.data) 
        }
    })


    // delete category action
export const deleteCategoryAction = createAsyncThunk(
    "category/delete", async (id, {rejectWithValue, getState,dispatch})=>{
        
        // get user token
           const user = getState()?.users;
           const {userAuth} = user;
        //http call 
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
        try {
            const {data} = await axios.delete(`${baseURL}category/delete/${id}` , config  )
            dispatch(resetDeleteAction())
        return data; 
        } catch (error) {
            if(!error?.response){
                throw ErrorEvent;
            }
            return rejectWithValue(error?.response?.data) 
        }
    })
// slices

const categorySlice = createSlice({
    name: 'category',
    initialState: {},
    extraReducers: (builder)=>{
        //category create
        builder.addCase(createCategoryAction.pending , (state,action)=>{
            state.loading = true;

        })
        //dispatch action to redirect
        builder.addCase(resetCategoryAction, (state,action)=>{
                  state.isCreated = true;
        })
        builder.addCase(createCategoryAction.fulfilled, (state,action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(createCategoryAction.rejected, (state,action)=>{
            state.loading = false;
            
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message;
        })

        //fetch category
        builder.addCase(fetchCategoriesAction.pending , (state,action)=>{
            state.loading = true;

        })
        builder.addCase(fetchCategoriesAction.fulfilled, (state,action)=>{
            state.loading = false;
            state.categoryList = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchCategoriesAction.rejected, (state,action)=>{
            state.loading = false;
            
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message;
        })


        
        //update category
        builder.addCase(updateCategoryAction.pending , (state,action)=>{
            state.loading = true;

        })
        //dispatch action
        builder.addCase(resetEditAction, (state,action)=>{
            state.isEdited = true;
        })
        builder.addCase(updateCategoryAction.fulfilled, (state,action)=>{
            state.loading = false;
            state.updatedCategory = action.payload;
            state.isEdited = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(updateCategoryAction.rejected, (state,action)=>{
            state.loading = false;
            
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message;
        })
    
    
        //delete category
    builder.addCase(deleteCategoryAction.pending , (state,action)=>{
        state.loading = true;

    })
    //dispatch for redirect
    builder.addCase(resetDeleteAction, (state,action)=>{
          state.isDeleted = true;
    })
    builder.addCase(deleteCategoryAction.fulfilled, (state,action)=>{
        state.loading = false;
        state.deletedCategory = action.payload;
        state.isDeleted = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    })
    builder.addCase(deleteCategoryAction.rejected, (state,action)=>{
        state.loading = false;
        
        state.appErr = action?.payload?.message ;
        state.serverErr = action?.error?.message;
    })


     //fetch single category
     builder.addCase(fetchSingleCategoryAction.pending , (state,action)=>{
        state.loading = true;

    })
    builder.addCase(fetchSingleCategoryAction.fulfilled, (state,action)=>{
        state.loading = false;
        state.category = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    })
    builder.addCase(fetchSingleCategoryAction.rejected, (state,action)=>{
        state.loading = false;
        
        state.appErr = action?.payload?.message ;
        state.serverErr = action?.error?.message;
    })
}
})

export default categorySlice.reducer