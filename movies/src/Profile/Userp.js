import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helper/api-helpers'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
const Userp = () => {
    const [bookings, setBookings] = useState();
    const [User, setUser] = useState();

    useEffect(()=>{
        getUserBooking().then((res)=>{setBookings(res.bookings)}).catch((err)=>console.log(err));
        getUserDetails().then((res)=>{setUser(res.User)}).catch((err)=>{console.log(err)});
    },[])
    console.log(bookings);

    const handleDelete=(id)=>{
        deleteBooking(id).then((res)=> console.log(res)).catch((err)=>{console.log(err)});
    }
  return (
    <Box width={'100%'} display='flex'>

     <Fragment>
   {User && (<Box flexDirection={'column'} justifyContent="center" alignItems={"center"} width={'30%'} padding={3}>
                <AccountCircleIcon sx={{fontSize:'10rem',textAlign:"center" , ml:3}}/>
                <Typography padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}> Name:{User.name}</Typography>
                <Typography mt= {1} padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}> Email:{User.email}</Typography>
            </Box> )}

           { bookings &&  (   <Box width={'70%'} display="flex" flexDirection={"column"}>
                    <Typography variant='h3' fontFamily={"verdana"} textAlign="center" padding={2}>Bookings</Typography>
                        <Box margin={'auto'} display="flex" flexDirection={'column'} width="80%">
                            <List>
                                {bookings.map((booking,index)=>
                                
                                    <ListItem sx={{bgcolor:"#00d386",color:"white",textAlign:'center', margin:1,}}>
                                    <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>Movie: {booking.movie.title}</ListItemText>
                                    <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>Seat : {booking.seatNumber}</ListItemText>
                                    <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>ReleaseDate: {new Date(booking.date).toDateString()}</ListItemText>
                                    <IconButton color='error' onClick={() =>handleDelete(booking._id)}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                </Box>)}
                </Fragment>
             
    </Box>
  )
}

export default Userp
