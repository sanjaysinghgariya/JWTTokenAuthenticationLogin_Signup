import React, { useState } from 'react'
import { TextField, FormControlLabel, Button, Checkbox, Box, Alert, formControlClasses, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/UserAuthApi';
import { storeToken } from '../../services/LocalStorage';


const Registration = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useNavigate();
    const [registerUser, {isLoading}] = useRegisterUserMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualdata = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            tc: data.get('tc')
        }
        console.log(actualdata)
        const res = await registerUser(actualdata);
        console.log(res)
        if (res.error){
            console.log(typeof(res.error.data.errors))
            console.log(res.error.data.errors)
            setServerError(res.error.data.errors)
        }
        if (res.data){
            console.log(typeof(res.data))
            console.log(res.data)
            storeToken(res.data.token)

            navigate('/dashboard')
        }

    }
    return (
        <>   
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
            <Box component='form' novalidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
               {server_error.name ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.name[0]}</Typography> : ""}  
                <TextField margin='normal' required fullWidth id='name'
                    name='name' label='name' />
                {server_error.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.email[0]}</Typography> : ""}
                <TextField margin='normal' required fullWidth id='email'
                    name='email' label='Email' />
                {server_error.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.password[0]}</Typography> : ""}
                <TextField margin='normal' required fullWidth id='password'
                    name='password' label='password' type='password' />
                {server_error.password2 ?  <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.password2[0]}</Typography>:""}
                <TextField margin='normal' required fullWidth id='password2'
                    name='password2' label='Confirm Password' type='password' />
                    {server_error.tc ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{server_error.tc[0]}</Typography>:""}
                <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
                    label="I agree term and condition." />

                <Box textAlign='center'>
                    <Button type='submit' variant='contained' >Registration </Button>
                </Box>
                

            </Box>

        </>
    )
}

export default Registration