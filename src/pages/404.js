import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
const Pagenp=()=>{
    return(
        <div style={{width:'100vw',height:'100vh',display:'grid',placeItems:'center'}}>
            <Box style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Typography variant="h1" style={{fontSize:'10rem',fontWeight:'bolder'}}>404</Typography>
            <Typography variant="subtitle2">This is not a valid URL</Typography>
            </Box>
        </div>
    )
}
export default Pagenp