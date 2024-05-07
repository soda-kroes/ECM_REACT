
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LOGO from '../../assets/logo/SODA.png'
import { Outlet } from 'react-router-dom';

function LayoutDashboardLogin() {
  return (
    
  //  <div>
  //    <div style={{padding:20, backgroundColor: 'pink'}}>
  //     <div style={{display:'flex'}}>
  //     <img src={LOGO} style={{width:50, height:50, borderRadius:10}} />
  //     <div>
  //       KSD STORE (Backend)
  //     </div>
  //     </div>
  //   </div>
    
  //   <div>
  //   <Outlet />
  //   </div>
  //  </div>

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <img src={LOGO} style={{width:50, height:50,borderRadius:10,marginRight:5}} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                KSD STORE (BACKEND)
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Outlet />
      </div>
  )
}

export default LayoutDashboardLogin
