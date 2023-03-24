const express=require('express');
const adminRouter=express.Router();
const {addAdmin,adminlogin,getAdmins, getAdminByID}=require('../Controllers/adminController');


adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminlogin);
adminRouter.get('/',getAdmins);
adminRouter.get("/:id", getAdminByID);


module.exports=adminRouter;

// port chnaged 4000