import React, { useState } from 'react'
import {Grid, Card, Typography, Tabs, Tab, Box} from '@mui/material'
import undraw from '../../images/undraw.png'
import Userlogin from './Userlogin'
import Registration from './Registration'
import { ShoppingBag } from '@mui/icons-material';


const TabPanel = (props) =>{
  const {children, value, index} = props
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index &&(
          <Box>
            {children}
          </Box>
        )
      }

    </div>
  )
}


const Login = () => {
  const [value, setValue] = useState(0);
  const handlechange = (event, newValue) =>{
    setValue(newValue);
  }
  return (
    <>
    <Grid container sx={{ height:'90vh' }}>
      <Grid item lg={7} sm={5} sx={{
        backgroundImage:`url(${undraw})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center',
        display:{xs:'none', sm:'block'},
      }}>
        

      </Grid>
      <Grid item lg={5} sm={5} xs={12}>
        <Card sx={{width:'100%' , height:'100%'}}>
          <Box sx={{mx:3, height:550}}>
            <Box sx={{borderBottom:1, borderColor:'divider'}}>
              <Tabs value={value} textColor='secondary' onChange={handlechange}>
                <Tab label='Login' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
                <Tab label='Register' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
              </Tabs>
              
            </Box>
            <TabPanel value={value} index={0}>
                  UserLogin
                  <Userlogin />
              </TabPanel>
            <TabPanel value={value} index={1}>
                  UserRegistration
                  <Registration />
            </TabPanel>
          </Box>
          <Box textAlign='center' sx={{ mt:2}}>
           <ShoppingBag sx={{color:'purple', fontSize:100}} />
           <Typography variant='h5' sx={{ fontWeight:'bold' }}>
           My Shop
        
           </Typography>


          </Box>



          </Card>
      </Grid>
    </Grid>
    </>
  )
}

export default Login