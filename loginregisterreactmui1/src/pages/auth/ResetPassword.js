import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { TextField, FormControlLabel, Button,Checkbox,  Box, Alert, formControlClasses, Typography } from '@mui/material'
import { NavLink, useNavigate, useParams} from 'react-router-dom'
import { useResetPasswordMutation } from '../../services/UserAuthApi'

const ResetPassword = () => {
    const [server_error, setServerError] = useState({status:false, msg:"", type:""})
    const [resetPassword] = useResetPasswordMutation()
    const [EmailServerMsg, setEmailServerMsg] = useState({ status: false, msg: "", type: "" })
    const [server_msg, setServerMsg] = useState({})
    const {id, token} = useParams()
    const navigate = useNavigate()
    console.log(id, token)

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actual_data ={
             
            password: data.get('password'),
            password2: data.get('password2'),
        }
        setEmailServerMsg({ status: true, msg: "Loading.....please wait for sometime", type: "warning" })
        const res = await resetPassword({actual_data, id, token})
        if (res.error) {
            setServerMsg({})
            setEmailServerMsg({})
            setServerError(res.error.data)
            console.log(res.error.data)
        }

        if (res.data) {
            setServerError({})
            setEmailServerMsg({})
            setServerMsg(res.data)
            setTimeout(() =>{
                navigate("/login")
            },3000)
        }
        
    }
  return (
    <>
    {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]} </Alert> : ''}
                {server_error.detail ? <Alert severity='error'>{server_error.detail}!  .. Please Login Again...</Alert> : ''}
    <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>

        <Box component='form' novalidate sx={{ mt: 1}} id='reset-form' onSubmit={handleSubmit}>
        
        
         <TextField margin='normal' required fullWidth id='password'
         name='password' label='password' type='password' />
         <TextField margin='normal' required fullWidth id='password2'
         name='password2' label='Confirm Password' type='password' />
         
    <Box textAlign='center'>
        <Button type='submit' variant='contained' >Change Password </Button>
    </Box>
    {EmailServerMsg.msg ? <Alert severity='warning'>{EmailServerMsg.msg}</Alert> : ''}
    {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
    </Box>

        </Grid>
    </Grid>
    </>
  )
}

export default ResetPassword