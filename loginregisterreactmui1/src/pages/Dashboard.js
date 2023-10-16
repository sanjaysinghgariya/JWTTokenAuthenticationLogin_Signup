import React, { useEffect, useState } from 'react'
import {  Button, CssBaseline, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChangePassword from './auth/ChangePassword';
import { getToken, removetoken } from '../services/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLoggedUserQuery } from '../services/UserAuthApi';
import { unSetUserToken } from '../features/AuthSlice';
import { setUserInfo } from '../features/UserSlice';
import { unsetUserInfo } from '../features/UserSlice';



const Dashboard = () => {
  const handleLogout = () =>{
    console.log('Logout Clicked');
    dispatch(unsetUserInfo({
      name:"",
      email:""
    }))
    dispatch(unSetUserToken( { access_token: null} ))
    removetoken()
    navigate('/login')

  }
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const {data, isSuccess}= useGetLoggedUserQuery(access_token)
  
  const [userData, setUserData] = useState({
    email: "",
    name:""
  })
  useEffect(() =>{
    if (data && isSuccess){
      setUserData({
        email:data.email,
        name:data.name
      })
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name
      }))
    }
  }, [data, isSuccess, dispatch])

  const mydata = useSelector(state => state.user)
  console.log("Changed passowrd", mydata)
  return (
    <>

    <CssBaseline />
    <h1> Dashboard </h1>
    <Grid container>
      <Grid item sm={4} sx={{backgroundColor:'gray', p:5, color:'white'}}>
        <Typography variant='h5'> Email: {userData.email}</Typography>
        <Typography variant='h6'> Name:  {userData.name}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt:8 }} >Logout</Button>
      </Grid>
      <Grid item sm={8}>

        <ChangePassword />
      </Grid>
    </Grid>
    </>
  )
}

export default Dashboard