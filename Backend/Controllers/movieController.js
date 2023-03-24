const Movies=require("../Models/Movie");
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const admin = require("../Models/admin");
const addMovies=async(req,res)=>{
    const extractToken= req.headers.authorization.split(" ")[1];

    if(!extractToken && extractToken.trim()===""){
        return res.status(401).json({
            message:"no Token provided"
        })
    }
    console.log(extractToken);
    let adminId;
    jwt.verify(extractToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err)
        {
            return res.status(401).json({
                message:"Invalid Token",
            });
        }
        else{
            adminId=decrypted.id;
            return;
        }
    })

    const {title,description,releaseDate,posterUrl,featured,actors}=req.body;
    console.log(req.body);

        if(res.status==400)
        {
            res.send("error");
        }
    if(!title && title.trim() === "" && !description && description.trim()=== "" && !posterUrl&&posterUrl.trim()=== "")
    {
        return res.status(422).json({
            message:"Invalid Inputs"
        }) 
    }

    let movie;
    try{
        movie=new Movies({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`),
            posterUrl,
            featured,
            admin:adminId,
            actors
        })
        
        const session=await mongoose.startSession();
        const adminUser= await admin.findById(adminId);

        session.startTransaction();
        await movie.save({session})
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});

        await session.commitTransaction();
    }
    catch(err)
    {
        return res.send(err.message);
    }
    if(!movie)
    {
        return res.status(500).json({
            message:"something went wrong"
        })
    }
    return res.status(201).json({movie})
}

const getallMovies=async(req,res,next)=>{
    let movies;
    try{
        movies=await Movies.find();
    }
    catch(err){
        return res.send(err.message);
    }
    if(!movies)
    {
        return res.status(500).json({
            message:"something went wrong"
        })
    }
    return res.status(200).json({movies})

}



const getMoviesbyId=async(req,res)=>{
    const id=req.params.id;
    let movie;
    try{
        movie=await Movies.findById(id);

    }
    catch(err)
    {
        return res.send(err.message);
    }

    if(!movie)
    {
        return res.status(404).json({
            message:'movie not found'
        })
    }
return res.status(200).json({movie});

}
module.exports={addMovies,getallMovies,getMoviesbyId}