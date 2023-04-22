import React, { useEffect } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { deletePostAction, fetchPostAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

const PostDetails = () => {
    const {id} = useParams();
    console.log(id)
    // const location = useLocation()
    // console.log(location)

 // select post details from store
 const posts = useSelector(state => state?.post)
 const {loading , postDetails: post, appErr, serverErr , isDeleted} = posts
  //console.log(post?.comment)

//comment 
const comment = useSelector(state => state.comment)
const {commentCreated , loading: commLoading, appErr: commAppErr , serverErr: commServerErr , commentDeleted} = comment;
    //dispatch action
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPostAction(id))
    },[id, dispatch, commentCreated, commentDeleted])

   
  

    //Get login user
  const loginId = useSelector(state => state?.users?.userAuth?._id);
  
   
    //redirect
    const navigate = useNavigate()
    if(isDeleted){
      navigate("/posts")
    }

  return (
    <>
      { loading ? <LoadingComponent/> : appErr|| serverErr ? <div className="text-lg text-red-500">{serverErr} {appErr}</div> :
      <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="container px-4 mx-auto">
        {/* Post Image */}
        <img
          className="mb-24 w-full h-96 object-cover"
          src={post?.image}
          alt=""
        />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
             {post?.title} 
          </h2>

          {/* User */}
          <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
          <Link to={`/profile/${post?.user?._id}`}>
            <img
              className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
              src={post?.user?.profilePhoto}
              alt=""
            />
            </Link>
            <div className="text-left">
              <Link to={`/profile/${post?.user?._id}`}>
              <h4 className="mb-1 text-2xl font-bold text-gray-50">
                <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                   {post?.user?.firstName}  {post?.user?.lastName}
                </span>
              </h4>
              </Link>
              <p className="text-gray-500">
                 <DateFormatter date={post?.createdAt} /> 
                
              </p>
            </div>
          </div>
          {/* Post description */}
          <div className="max-w-xl mx-auto">
            <div className="mb-6 text-left  text-xl text-gray-200">
               {post?.description}
              {/* um has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letrase */}
              {/* Show delete and update btn if created user */}
              {post?.user?._id === loginId ?  <p className="flex">
                <Link to={`/update-post/${post?._id}`} className="p-3">
                  <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                </Link>
                <button
                onClick={()=>dispatch(deletePostAction(id))}
                className="ml-3">
                  <TrashIcon
                  
                  className="h-8 mt-3 text-red-600" />
                </button>
              </p> : null}
             
            </div>
          </div>
        </div>
      </div>
      {/* Add comment Form component here */}

      <div className="flex justify-center  items-center">
        {loginId ? <AddComment postId={id}></AddComment> : null }
        
         
        
      </div>

      <div className="flex justify-center  items-center">
       
         <CommentsList comments={post?.comment} postId={post?._id} /> 
        
      </div>

    </section> }
    </>
  );
};

export default PostDetails;
