import React from 'react'
import Table from '../Components/tabel'
import {subHeadCells , subRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'


function Subscription() {
    return (
        <Box>
            <Header/>
            <Box ml={2}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Subcriptions",url:"/subcriptions"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
            <Table rows={subRows} headCells={subHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Subscription