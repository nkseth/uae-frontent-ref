import React from 'react'
import Table from '../Components/tabel'
import {companyHeadCells , companyRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'


function Companies() {
    return (
        <Box>
            <Header/>
            <Box ml={2}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Companies",url:"/Companies"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
            <Table rows={companyRows} headCells={companyHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Companies