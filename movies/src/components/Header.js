import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar,Box, Tabs, Tab, Autocomplete, TextField, IconButton} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { getAllMovies } from '../api-helper/api-helpers'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions } from '../store'
// import {Link,Routes,Route} from 'react-router-dom';
// const dummyArray=["IronMan","Pathaan","Selfie","ABCD"]

const Header = () => {
  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
const [value,setvalue]=useState(0);
const [movies,setmovies]=useState([]);

useEffect(()=>{
getAllMovies().then((data)=>{
  setmovies(data.movies);
}).catch((err)=>{
console.log(err)
});
},[])
const logout=(isAdmin)=>{
dispatch(isAdmin?adminActions.logout():userActions.logout());
}
  return (
  <AppBar position="sticky" sx={{bgcolor:'#2b2b42'}}>
    <Toolbar>
        <Box width={"20%"}>
                    <IconButton LinkComponent={Link} to="/" >
                        <MovieIcon/>
                        </IconButton>
                </Box>
    
    
    <Box width={"30%"} margin={"auto"}>
    <Autocomplete
       
        freeSolo
        options={movies.map((option) => option.title)}
        renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant ='standard' {...params} placeholder="Search Movies" />}
      />
    </Box>
    <Box display={"flex"}>
    <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>{setvalue(val)}}>
    
    <Tab LinkComponent={Link} to='/movies' label ="All Movies"/>

{ !isAdminLoggedIn && !isUserLoggedIn && <>

  <Tab LinkComponent={Link} to='/auth' label="Auth"/>
<Tab LinkComponent={Link} to='/admin' label="Admin"/>
</>
}

        {isUserLoggedIn && (
          <>
          <Tab LinkComponent={Link} to='/user' label="Profile"/>
          <Tab onClick={()=>logout(false)} LinkComponent={Link} to='/' label="Logout"/>
          </>
        )}
        {isAdminLoggedIn && (
          <>
          <Tab LinkComponent={Link} to='/add' label="Add Movie"/>
          <Tab LinkComponent={Link} to='/user-admin' label="Profile"/>
          <Tab onClick={()=>logout(true)} LinkComponent={Link} to='/' label="Logout"/>
          </>
        )}

    </Tabs>

    </Box>
    </Toolbar>
  
  </AppBar>
  )
}

export default Header
