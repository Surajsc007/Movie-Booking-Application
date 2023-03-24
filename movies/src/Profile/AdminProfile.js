import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import  {getAdminById} from '../api-helper/api-helpers'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {  List, ListItem, ListItemText, Typography } from '@mui/material';
const AdminProfile = () => {
    
    const [Admin, setAdmin] = useState();

    useEffect(()=>{
       
      getAdminById().then((res)=>{setAdmin(res.Admin)}).catch((err)=>{console.log(err)});
    },[])
   

   
  return (
    <Box width={'100%'} display='flex'>

     <Fragment>
   {Admin && (<Box flexDirection={'column'} justifyContent="center" alignItems={"center"} width={'30%'} padding={3}>
                <AccountCircleIcon sx={{fontSize:'10rem',textAlign:"center" , ml:3}}/>
              
                <Typography mt= {1} padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}> Email:{Admin.email}</Typography>
            </Box> )}

           { Admin && Admin.addedMovies.length > 0 && (   <Box width={'70%'} display="flex" flexDirection={"column"}>
                    <Typography variant='h3' fontFamily={"verdana"} textAlign="center" padding={2}>Added Movies</Typography>
                        <Box margin={'auto'} display="flex" flexDirection={'column'} width="80%">
                            <List>
                                {Admin.addedMovies.map((movie,index)=>
                                
                                    <ListItem sx={{bgcolor:"#00d386",color:"white",textAlign:'center', margin:1,}}>
                                    <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>Movie: {movie.title}</ListItemText>
                             
                                    
                                   
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                </Box>)}
                </Fragment>
             
    </Box>
  )
}

export default AdminProfile
