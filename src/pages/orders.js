import React from 'react'
import Table from '../Components/tabel'
import {orderHeadCells , orderRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'


function Orders() {
    return (
        <Box>
            <Header/>
            <Box ml={2}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Orders",url:"/orders"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
            <Table rows={orderRows} headCells={orderHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Orders