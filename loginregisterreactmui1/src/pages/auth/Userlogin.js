import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, Alert, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../services/UserAuthApi'
import { getToken, storeToken } from '../../services/LocalStorage'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../features/AuthSlice'


const Userlogin = () => {
    const [server_error, setServerError] = useState({})
    const [loginUser, { isLoading }] = useLoginUserMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualdata = {
            email: data.get('email'),
            password: data.get('password'),
        }
        const res = await loginUser(actualdata)
        
       
        if (res.error) {
            setServerError(res.error.data.error.errors)
            setServerError(res.error.data.error)

        }
        if (res.data) {
            console.log(typeof (res.data))
            console.log(res.data)
            storeToken(res.data.token)
            let { access_token } = getToken()
            dispatch(setUserToken({access_token:access_token}))


            navigate('/dashboard')
        }
    }
    let { access_token } = getToken()
    useEffect(()=>{
        
        dispatch(setUserToken({access_token:access_token}))

    }, [access_token, dispatch])




    

    return (
        <>
            <Box component='form' novalidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
                <TextField margin='normal' required fullWidth id='email'
                    name='email' label='Email' />
                {/* {server_error.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.email[0]}</Typography> : ""} */}
                <TextField margin='normal' required fullWidth id='password'
                    name='password' label='password' type='password' />
                {/* {server_error.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.password[0]}</Typography> : ""} */}
                <Box >
                    <Button type='submit' variant='contained' >Login </Button>
                </Box>
                <NavLink to='/sendpasswordresetemail'>Forget Password ?</NavLink>
                

            </Box>

        </>
    )
}

export default Userlogin