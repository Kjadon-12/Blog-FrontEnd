//import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/User/Register/Register'
import Login from './Components/User/Login/Login';

import  Navbar  from './Components/Navigation/Navbar';
import AddNewCategory from './Components/Categories/AddNewCategory';
import CategoryList from './Components/Categories/CategoryList';
import UpdateCategory from './Components/Categories/UpdateCategory';
import PrivateProtectRoute from './Components/Navigation/ProtectedRoutes/PrivateProtectRoute';
import ProtectedAdminRoute from './Components/Navigation/ProtectedRoutes/ProtectedAdminRoute';
import CreatePost from './Components/Posts/CreatePost';
import PostsList from './Components/Posts/PostsList';
import PostDetails from './Components/Posts/PostDetails';
import UpdatePost from './Components/Posts/UpdatePost';
import UpdateComment from './Components/Comments/UpdateComment';
import Profile from './Components/User/Profile/Profile';
import UploadProfilePhoto from './Components/User/Profile/UploadProfilePhoto';
import UpdateProfileForm from './Components/User/Profile/UpdateProfileForm';
import SendEmail from './Components/User/Emailing/SendEmail';
import AccountVerified from './Components/User/AccountVerification/AccountVerified';
import UsersList from './Components/User/UsersList/UsersList';
import UpdatePassword from './Components/User/PasswordManagement/UpdatePassword';
import ResetPassword from './Components/User/PasswordManagement/ResetPassword';
import ResetPasswordForm from './Components/User/PasswordManagement/ResetPasswordForm';


function App() {
  return (
    <>
    
  <BrowserRouter>
  <Navbar/>
  <Routes>
      <Route path='/' element={<HomePage></HomePage>}/>
      <Route path='/register' element={<Register></Register>}/>
      <Route path ='/login' element={<Login></Login>}/>
      
      {/* <Route path ='/add-category' element={<AddNewCategory></AddNewCategory>}/> */}
      <Route path="/add-category" element={<ProtectedAdminRoute> <AddNewCategory/></ProtectedAdminRoute> }/>
      {/* <PrivateProtectRoute path="/add-category" element={AddNewCategory}></PrivateProtectRoute> */}
      {/* <Route path ='/category-list' element={<CategoryList></CategoryList>}/> */}
      <Route path="/category-list" element={<ProtectedAdminRoute> <CategoryList/></ProtectedAdminRoute> }/>
      {/* <Route path ='/update-category/:id' element={<UpdateCategory></UpdateCategory>}/> */}
      <Route path="/update-category/:id" element={<ProtectedAdminRoute> <UpdateCategory/></ProtectedAdminRoute> }/>
      <Route path="/create-post" element={<PrivateProtectRoute> <CreatePost/></PrivateProtectRoute> }/>
      <Route path="/posts" element={ <PostsList/> }/>
      <Route path="/posts/:id" element={ <PostDetails/> }/>
      <Route path="/update-post/:id" element={<PrivateProtectRoute> <UpdatePost/></PrivateProtectRoute> }/>
      <Route path="/update-comment/:id" element={<PrivateProtectRoute> <UpdateComment/></PrivateProtectRoute> }/>
      <Route path="/profile/:id" element={<PrivateProtectRoute> <Profile/></PrivateProtectRoute> }/>
      <Route path="/upload-profile-photo/:id" element={<PrivateProtectRoute> <UploadProfilePhoto/></PrivateProtectRoute> }/>
      <Route path="/update-profile/:id" element={<PrivateProtectRoute> <UpdateProfileForm/></PrivateProtectRoute> }/>
      <Route path="/send-email" element={<ProtectedAdminRoute> <SendEmail/></ProtectedAdminRoute> }/>
      <Route path="/verify-account/:token" element={<PrivateProtectRoute> <AccountVerified/></PrivateProtectRoute> }/>
      <Route path="/users" element={<ProtectedAdminRoute> <UsersList/></ProtectedAdminRoute> }/>
      <Route path="/update-password" element={<PrivateProtectRoute> <UpdatePassword/></PrivateProtectRoute> }/>
      <Route path="/password-reset-token" element={ <ResetPasswordForm/>}/>
      <Route path="/reset-password/:token" element={ <ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
