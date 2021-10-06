/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Box} from '@mui/material'
import MainContent from '../Components/maincontent'

import React from 'react'

import Header from '../Components/header'

const MainPage=()=>{


    return(
        <Box >
            <Header/>
          <MainContent/>
        </Box>
    )
}
export default MainPage