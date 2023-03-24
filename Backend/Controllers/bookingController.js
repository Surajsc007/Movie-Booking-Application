const  mongoose  = require('mongoose');
const Bookings=require('../Models/Booking');
const Movies = require('../Models/Movie');
const users=require('../Models/User');

const Booking=async(req,res,next)=>{
    const {movie,date,seatNumber,user}=req.body;
    let exisitingMovie;
    let exisitingUser;
    try{
        exisitingMovie=await Movies.findById(movie);
        exisitingUser=await users.findById(user);
        console.log(exisitingUser,exisitingMovie)
    }   
    catch(e)
    {
        return res.send(e.message);
    }
    if(!exisitingMovie)
    {
        return res.status(404).json({message:"Movie not found by given id"});
    }
    if(!exisitingUser)
    {
        return res.status(404).json({message:"User not found by given id"});
    }
    let newBooking;
    try{
        newBooking=new Bookings({
            movie,
            date:new Date(`${date}`),
            seatNumber,
            user
        });


        const session= await mongoose.startSession();
         session.startTransaction();
        exisitingUser.bookings.push(newBooking)
        exisitingMovie.bookings.push(newBooking);
        await exisitingUser.save({ session });
        await exisitingMovie.save({ session });
        await newBooking.save({ session });
        
        session.commitTransaction();
        
        
        // newBooking = await newBooking.save();
      
    }
    catch(e)
    {
        res.send(e.message);
    }

    if(!newBooking)
    {
        res.status(400).json({
            message:"something Went Wrong"
        })
    }
    console.log(newBooking);
    return res.status(201).json({newBooking});
    
}




const getbookbyId=async(req,res)=>{
    
}

const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
       await booking.user.bookings.pull(booking);
       await booking.movie.bookings.pull(booking);
        
        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction(); 
    }
    catch (err) {
        return console.error(err);
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found by given id" });
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
}
module.exports={Booking,deleteBooking}