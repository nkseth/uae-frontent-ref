import React,{useContext} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Magic } from 'magic-sdk';
import { withRouter } from 'react-router';
import { Avatar,Box, Button } from '@mui/material';
import { AuthContext } from '../Auth';
import Link from '@mui/material/Link';


 const BasicPopover=({history})=> {
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
        })
      
     
}
 
  return (
    <div>
      
      <Avatar  aria-describedby={id} variant="contained" onClick={handleClick}/>
     
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
          <Box px={5} py={2} style={{display:'flex',flexDirection:'column'}}>
         <Link underline="hover" color="inherit" href="/Profile">
               Profile
              </Link>
              <Link underline="hover" color="inherit" href="/Profile">
               Orders
              </Link>
              <Link underline="hover" color="inherit" href="/Profile">
               Companies
              </Link>
              <Link underline="hover" color="inherit" href="/Profile">
               Subscription
              </Link>
              <Link underline="hover" color="inherit" href="/Profile">
               Payment Method
              </Link>
              <Button   onClick={Logoutclick}>
               Logout
              </Button>
              </Box>
      </Popover>
    </div>
  );
}
export default withRouter(BasicPopover)
