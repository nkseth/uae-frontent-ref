import React from 'react';
import Popover from '@mui/material/Popover';

import { Magic } from 'magic-sdk';
import { withRouter } from 'react-router';
import { Avatar,Box, Button } from '@mui/material';

import Link from '@mui/material/Link';
import { deepOrange } from '@mui/material/colors';


 const BasicPopover=({history,location,user})=> {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const m = new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY);

const Logoutclick= async()=>{
   
        await m.user.logout().then(()=>{
        
          history.push('/')
         document.location.reload()
        })
      
     
}
const linkstyle={
  display:'flex',
  justifyConent:'center',

}
 
  return (
    <div>
      
      <Avatar  aria-describedby={id} style={{cursor:'pointer'}}  onClick={handleClick}
      sx={{ bgcolor: deepOrange[500] }}
      >{ user[0].toUpperCase()}</Avatar>
     
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
          <Box px={5} py={2} style={{display:'flex',flexDirection:'column',alignItem:"center"}}>
            <Box
           
            style={{color:'lightblue'}}
            >{user}</Box>
         <Link 
         style={linkstyle}
         underline="hover" color="inherit" href="/Profile">
               Profile
              </Link>
              <Link  style={linkstyle} underline="hover" color="inherit" href="/Profile">
               Orders
              </Link>
              <Link  style={linkstyle} underline="hover" color="inherit" href="/Profile">
               Companies
              </Link>
              <Link  style={linkstyle} underline="hover" color="inherit" href="/Profile">
               Subscription
              </Link>
              <Link underline="hover" color="inherit" href="/Profile">
               Payment Method
              </Link>
              <Button   style={linkstyle} onClick={Logoutclick}>
               Logout
              </Button>
              </Box>
      </Popover>
    </div>
  );
}
export default withRouter(BasicPopover)
