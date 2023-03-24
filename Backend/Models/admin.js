const mongoose=require('mongoose');
const mongo=require('mongoose');

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:6,
        required:true,
    },
    addedMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movies"
        
    },
    ],
})
const admin=mongoose.model('admin',adminSchema);
module.exports=admin