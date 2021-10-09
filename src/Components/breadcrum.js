import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';
import {Link as Linki } from '@mui/material' 

function handleClick(event) {
 
}

export default function Breadcrumb(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
          {props.crum.map((item,index)=>{
              return(
                <Link to={item.url}>
                <Linki underline="hover" color={index===props.crum.length-1?"primary":"inherit"} >
                {item.label}
              </Linki>
              </Link>
              )
          })}
       
      
      </Breadcrumbs>
    </div>
  );
}
