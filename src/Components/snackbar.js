import  React,{useContext} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import  { UIContext } from '../Context/UIcontextapi';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars() {
const {UIstate,UIdispatch}=useContext(UIContext)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    UIdispatch({type:"SNACKBAR",payload:{type:'error',message:'close',status:false}})
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
     
      <Snackbar open={UIstate.snackbar.status} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={UIstate.snackbar.type} sx={{ width: '100%' }}>
          {UIstate.snackbar.message}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}
