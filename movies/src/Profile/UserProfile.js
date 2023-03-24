import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helper/api-helpers'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const UserProfile = () => {

  const [bookings, setbookings] = useState()

  const [User, setUser] = useState();

  useEffect(()=>{
     getUserBooking()
     .then((res)=>setbookings(res.bookings))
     .catch((err)=>{console.log(err)});  

     getUserDetails()
     .then((res) => setUser(res.User))
     .catch(err => console.log(err));
  },[])

  console.log(bookings);

  const handleDelete=(id)=>{
    deleteBooking(id).then((res)=>console.log(res)).catch((err)=>console.log(err));
  }


  
  console.log(User);

  return (
    <Box width={"100%"} display="flex">
    <Fragment>
      
    {User&&(
      <Box
      flexDirection={'column'}
      width={"30"}
      justifyContent="center"
      alignItems={"center"}
      padding={3}>

      <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: 'center', ml: 2 }} />

      <Typography
        mt={1}
        padding={1}
        width={"auto"}
        textAlign={'center'}
        border={'1px solid #ccc'}
        borderRadius={6}> Name:{User.name}
      </Typography>

      <Typography
        padding={1}
        width={"auto"}
        textAlign={'center'}
        border={'1px solid #ccc'}
        borderRadius={6}> Email:{User.email}
      </Typography>

      </Box>
    )}


    
    {bookings &&
        (bookings.length > 0) & ( < Box width={"70%"}
        display="flex"
        flex-direction={"column"}
      >
        <Typography variant='h3' fontFamily={'verdana'} textAlign="center"
          padding={2}
        >
          Bookings
        </Typography>
        <Box margin={'auto'}
          display="flex"
          flexDirection={'column'}
          width="80%"
        >
          <List>
            {bookings.map((booking, index) => (
              <ListItem
                sx={{
                  bgcolor: "#000d386",
                  color: "white",
                  textAlign: "center",
                  margin: 1,
                }}
              >
                <ListItemText sx={{
                  margin: 1,
                  width: 'auto',
                  textAlign: "left"
                }}
                >
                  Movie: {booking.movie.title}
                  
                </ListItemText>


                <ListItemText sx={{
                  margin: 1,
                  width: 'auto',
                  textAlign: "left"
                }}
                >
                  Seat: {booking.seatNumber}
                </ListItemText>

                <ListItemText sx={{
                  margin: 1,
                  width: 'auto',
                  textAlign: "left"
                }}
                >
                  Date: {new Date(booking.date).toDateString()}
                </ListItemText>
                <IconButton onClick={() => handleDelete(booking._id)} color='error'>
                  <DeleteForeverIcon
                    color='red'
                  />
                </IconButton>
              </ListItem>
            ))}

          </List>
        </Box>

        </Box>
        )}
    
    </Fragment>
</Box>
   
  )
}

export default UserProfile
