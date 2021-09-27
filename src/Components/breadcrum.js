import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
 
}

export default function Breadcrumb(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
          {props.crum.map((item=>{
              return(
                <Link underline="hover" color="inherit" href={item.url}>
                {item.label}
              </Link>
              )
          }))}
       
      
      </Breadcrumbs>
    </div>
  );
}
