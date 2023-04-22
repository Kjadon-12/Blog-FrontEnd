import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';


const CategoryDropDown = (props) => {

    //dispatch action
    const dispatch = useDispatch();
    

    useEffect(()=>{
         dispatch(fetchCategoriesAction())
    },[dispatch])
// select categories

const category = useSelector(state => state?.category)

const {loading, appErr, serverErr, categoryList} = category;

const allCategories = categoryList?.map(category=>{
    return {label: category.title , value: category?._id}
})

    
  // handle change
  const handleChange = (value)=>{
         props.onChange('category', value)
  }  


  //handle blur

  const handleBlur = ()=>{
    props.onBlur('category', true)
  }

  return (

    <div>
        {loading ? 
        (<h3>Loading please wait</h3>) :
        (
            <Select id="category" onChange={handleChange} onBlur={handleBlur} options={allCategories} value={props?.value?.label}></Select>
  
        )}
        {/* display errors */}
        {props?.error && <div className='text-red-500'>
            {props?.error}
            </div>}
    </div>
   
    )
}

export default CategoryDropDown







