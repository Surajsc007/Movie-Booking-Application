const express=require('express');
const userRouter=express.Router();
const {getallUser,addUser,updateUser, deleteUser, login, signup, getUserById, getBookingsofUser}=require('../Controllers/userController');
const user = require('../Models/User');


userRouter.get('/',getallUser);
userRouter.get("/:id", getUserById);
userRouter.post('/signup',signup);
userRouter.put("/:id",updateUser);
userRouter.delete('/:id',deleteUser);
userRouter.post('/login',login);
userRouter.get("/bookings/:id",getBookingsofUser)

//userRouter.post("/signup", signup);
module.exports=userRouter;