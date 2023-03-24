import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Auth from "./components/auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import Homepage from "./components/HomePage/Homepage";
import AddMovies from "./components/Movies/AddMovies";
import Movies from "./components/Movies/Movies";
import AdminProfile from "./Profile/AdminProfile";
//import UserProfile from "./Profile/UserProfile";
import Userp from "./Profile/Userp";
import { adminActions, userActions } from "./store";

function App() {
  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLoggedIN",isAdminLoggedIn)
  console.log("isUserLoggedIN",isUserLoggedIn)

  useEffect(()=>{
    if(localStorage.getItem("userId"))
    {
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId"))
    {
      dispatch(adminActions.login());
    }// eslint-disable-next-line
  },[])
  return (
    <div>
    {/* Header */}
    <Header/>
    <section>
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/booking/:id" element={<Booking/>}/>
      {/* <Route path="/user" element={<UserProfile/>}/> */}
      <Route path="/user-admin" element={<AdminProfile />} />
      <Route path="/user" element={<Userp/>}/>
      <Route path="/add" element={<AddMovies/>}/>
      </Routes>
    </section>
    </div>

  );
}

export default App;


