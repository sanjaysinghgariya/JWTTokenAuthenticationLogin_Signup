import React from 'react'
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorage'

const Navbar = () => {
  const { access_token } = getToken()
  return (
    <>
    
    <Box sx={{flexGrow:1}}>
    <AppBar position="static" color="secondary">
      <Toolbar>
      <Typography variant='h5' component='div' sx={{flexGrow:1}}>

             My shop

      </Typography>
      <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }}} sx={{color:'white'}}>Home</Button>
      <Button component={NavLink} to='contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }}}  sx={{color:'white'}}>Contact</Button>


      {access_token ? <Button component={NavLink} to='dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }}}  sx={{color:'white'}}>Dashboard</Button> :
      <Button component={NavLink} to='login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }}}  sx={{color:'white'}}>Login</Button> }
      </Toolbar>


    </AppBar>  
       
    </Box>
    
    
    </>
  )
}

export default Navbar