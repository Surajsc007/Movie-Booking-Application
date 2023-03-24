const express=require('express');
const bookingRouter=express.Router();
const {Booking,deleteBooking}=require('../Controllers/bookingController')

bookingRouter.post('/',Booking);
bookingRouter.delete('/:id',deleteBooking);

module.exports=bookingRouter;