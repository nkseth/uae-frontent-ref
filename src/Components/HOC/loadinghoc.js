import React, { useContext } from 'react';

import {UIContext } from '../../Context/UIcontextapi';


const UIloading=({component:LoadingComponent})=>
{

   const  {UIdispatch}=useContext(UIContext)
  return <LoadingComponent UIdispatch={UIdispatch}/>
        
}
export default UIloading