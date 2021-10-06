import React,{useContext} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {UIContext} from '../Context/UIcontextapi'
import { Typography } from '@mui/material';

export default function Loder() {
    const {UIstate,UIdispatch}=useContext(UIContext)



 
  return (
    <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={UIstate.loading}
       
      >
        <CircularProgress color="inherit" />
        <Typography>Please Wait</Typography>
      </Backdrop>
    </div>
  );
}