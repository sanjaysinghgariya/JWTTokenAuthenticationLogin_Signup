import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { TextField, FormControlLabel, Button, Checkbox, Box, Alert, formControlClasses } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useChangeuserPasswordMutation } from '../../services/UserAuthApi'
import { getToken } from '../../services/LocalStorage'




const ChangePassword = () => {
    const [server_error, setServerError] = useState({})
    const [servermsg, setServermsg] = useState({})
    const [ChangeUserPassword] = useChangeuserPasswordMutation()
    const [server_msg, setServerMsg] = useState({})
    const { access_token } = getToken()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actual_data = {
            password: data.get('password'),
            password2: data.get('password2'),
        }
        console.log(actual_data)
        console.log(access_token)

        const res = await ChangeUserPassword({ actual_data, access_token})
        
        
        if (res.error) {
            setServerMsg({})
            setServerError(res.error.data)
            console.log(res.error.data.detail)
            
            console.log(res.error.data)
        }

        
        if (res.data) {
            console.log(res.data)
            setServerError({})
            setServerMsg(res.data)
            document.getElementById("ChangePassword-form").reset()
        }
        
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
                <h1> Change Password</h1>
                {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]} </Alert> : ''}
                {server_error.detail ? <Alert severity='error'>{server_error.detail}!  .. Please Login Again...</Alert> : ''}
                <Box component='form' novalidate sx={{ mt: 1 }} id='ChangePassword-form' onSubmit={handleSubmit}>


                    <TextField margin='normal' required fullWidth id='password'
                        name='password' label='password' type='password' />
                    <TextField margin='normal' required fullWidth id='password2'
                        name='password2' label='Confirm Password' type='password' />

                    <Box textAlign='center'>
                        <Button type='submit' variant='contained' >Update </Button>
                    </Box>
                    {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}

                </Box>


            </Box>
        </>
    )
}





export default ChangePassword