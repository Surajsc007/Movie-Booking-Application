const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:'Booking',
        required:true
    }]
});
const user=mongoose.model('user',UserSchema);
module.exports=user;