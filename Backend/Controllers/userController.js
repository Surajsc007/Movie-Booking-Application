const user=require("../Models/User");
const bcrypt=require("bcryptjs")
const Bookings=require('../Models/Booking');
const getallUser=async(req,res,next)=>{
    let users;
    try{
        users= await user.find();
    }
    catch(e){
        return res.json(e);
    }
    if(!users)
    {
        return res.status(500).json({
            message:"unexpected error occured!"
        })


    }
    return res.status(200).json({users})
};

const signup=async(req,res,next)=>{
const {name,email,password}=req.body;
if(!name&&name.trim()=== "" && !email&&email.trim()==="" && !password&&password.trim()==="")
{
    return res.status(400).json({message:"Invalid Input data"});
    
}
const hashedPassword=bcrypt.hashSync(password);
let users;
try{
    users=new user({name,email,password:hashedPassword});
    await users.save();

}
catch(e)
{
    return res.json({e});
}
if(!users)
{
    return res.status(500).json({message:'unexpected error'});
}
return res.status(201).json({id:users._id})
}


const updateUser=async(req,res,next)=>{
 const id=req.params.id;
  //let datatobeUpdated=req.body;

  const {name,email,password}=req.body;
if(!name&&name.trim()=== "" && !email&&email.trim()==="" && !password&&password.trim()==="")
{
    return res.status(422).json({message:"Invalid Input data"});
    
}
let users;
try{
users= await user.findByIdAndUpdate(id,{name,email,password});

}
catch(err)
{
    return res.send(err.message);
}
if(!users){
return res.status(500).json({message:"unexpected User"})
}
res.status(200).json({message:"Updated User",User:users});
}


const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
    let users;
    try{
        users= await user.findByIdAndDelete(id)
    }
    
    catch(e)
    {
        return res.send(e.message);
    }
    if(!users)
    {
        return res.status(500).json({message:"unexpected User"})

        
    }
    res.status(200).json({message:"Delete User",User:users});
}

const login =async(req,res,next)=>{
const {email,password}=req.body;
if(!email && email.trim() === "" && !password && password.trim() === "")
{
    return res.status(400).json({message:"Invalid Input data"});
    
}
let existingUser;
try{
    existingUser =await user.findOne({email});
}
catch(e)
{
    return res.send(e.message);
}
if(!existingUser)
{
    return res.status(404).json({message:"unable to find the user from this id"})
}
const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
if(!isPasswordCorrect)
{
    return res.status(400).json({message:"Invalid Credentials"});
}
return res.status(200).json({message:"login Succesfull",
id:existingUser._id
})
}
const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let User;
    try {
        User = await user.findById(id);
    }
    catch(err) {
        return console.log(err);
    }
    if (!User) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ User });
}
const getBookingsofUser = async (req, res) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({user:id})
        .populate("user movie");
       
    } catch(err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ bookings});   
}


module.exports={getallUser,updateUser,deleteUser,login,signup,getUserById,getBookingsofUser};
