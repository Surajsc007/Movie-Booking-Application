const admin=require('../Models/admin');
const bcrypt=require('bcryptjs');
const jwt = require( "jsonwebtoken");
const addAdmin=async(req,res,next)=>{
    const {email,password}=req.body;

    let existingAdmin;
    try{
        existingAdmin= await admin.findOne({email});
    }
    catch(e)
    {
        return res.send(err);
    }
    if(existingAdmin)
    {
        return res.status(400).json({message:"Admin already exists"});

    }
    let admins;
    const hashedPassword=bcrypt.hashSync(password);
    try{
        admins=new admin({email,password:hashedPassword})
        admins=await admins.save();

    }
    catch(err)
    {
        res.send(err.message);
    }
    if(!admins){
        return res.status(400).json({message:"unable to create admin"});
    }
    res.status(201).json({message:"Admin Created"});

}

const adminlogin=async(req,res)=>{
    const {email,password}=req.body;

    if(!email&&email.trim()==="" && !password&&password.trim()==="")
{
    return res.status(400).json({message:"Invalid Input data"});
    
}
let existingAdmin;
try{
    existingAdmin=await admin.findOne({email});
}
catch(err)
{
    return console.log(err);
}
if(!existingAdmin)
{
    return res.status(401).json({message:"admin not found"});
}
const isPasswordCorrect=bcrypt.compareSync(password,existingAdmin.password);
if(!isPasswordCorrect)
{
    return res.status(400).json({message:"invalid password"});
}
const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
    expiresIn:"7d"
})

res.status(200).json({message:"Login Succesfull",token,id:existingAdmin._id});
}

const getAdmins=async(req,res)=>{
    let admins;
    try{
        admins=await admin.find();
    }
    catch(e)
    {
        return res.send(e.message);
    }
    if(!admins)
    {
        return res.status(400).json({message:"cannot get admin"});
    }
    return res.status(200).json({admins});
}
const getAdminByID = async (req, res, next) => {
    const id = req.params.id;
    let Admin;
    try {
        Admin = await admin.findById(id).populate("addedMovies");
    } catch (err) {
        return console.error(err);
    }
    
    if (!Admin) {
        return console.log("Cannot find Admin");
        
    }
    
    return res.status(200).json({ Admin })
};


module.exports={addAdmin,adminlogin,getAdmins,getAdminByID}