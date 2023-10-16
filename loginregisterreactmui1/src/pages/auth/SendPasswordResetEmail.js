import React, { useState } from 'react'
import { Grid, Card, Typography, Tabs, Tab } from '@mui/material'

import { TextField, Button, Box, Alert } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSendPasswordResetEmailMutation } from '../../services/UserAuthApi'

const SendPasswordResetEmail = () => {
    const [server_error, setServerError] = useState({ status: false, msg: "", type: "" })
    const navigate = useNavigate();
    const [EmailServerMsg, setEmailServerMsg] = useState({ status: false, msg: "", type: "" })
    const [server_msg, setServerMsg] = useState({})
    const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualdata = {
            email: data.get('email'),
        }
        setEmailServerMsg({ status: true, msg: "Loading.....please wait for sometime", type: "warning" })
        const res = await sendPasswordResetEmail(actualdata);

        // console.log(actualdata)
        if (res.error) {
            setEmailServerMsg({})
            setServerMsg({})
            setServerError(res.error.data)
            console.log(res.error.data.detail)
            console.log(res.error.data)
        }

        
        if (res.data) {
            console.log(res.data)
            setEmailServerMsg({})
            setServerError({})
            setServerMsg(res.data)
        }
    }
    return (
        <>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]} </Alert> : ''}
                {server_error.detail ? <Alert severity='error'>{server_error.detail}!  .. Please Login Again...</Alert> : ''}
            <Grid container justifyContent='center'>
            
                <Grid sm={6} xs={12}>
                    <Box component='form' novalidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth id='email'
                            name='email' label='Email' />
                        <Box >
                            <Button type='submit' variant='contained' >Login </Button>
                        </Box>
                        {EmailServerMsg.msg ? <Alert severity='warning'>{EmailServerMsg.msg}</Alert> : ''}
                        {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}

                    </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default SendPasswordResetEmail