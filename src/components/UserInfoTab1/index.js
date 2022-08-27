import React, { useEffect, useState } from 'react';
import { UserInfoItemWrapper, NButton  } from '../BaseWrapper'

import {Grid,TextField, Snackbar, Alert } from '@mui/material';

import {useStateValue} from '../../StateProvider';
import copy from 'copy-to-clipboard';


const UserInfoTab1 = () => {

  const [user, setUser] = useState({email : '', userId: ''})
  const [state, dispatch] = useStateValue();
  const [open, setOpen] = useState(false)

  useEffect(() => {
    
    if(state) {
      setUser(state.userInfo)
    }
    
  }, [state?.userInfo])
  
  const handleClick = ( ) => {
    console.log('clicked')
    copy(user.userId)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Coppied To Clip Board
        </Alert>
      </Snackbar>
      <UserInfoItemWrapper>
      <Grid container spacing={4}>
              
              <Grid item xs={10}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={9}>
                    <TextField variant='filled' id="filled-basic" name='Id' fullWidth={true} label="Name" disabled={true} value={user.userId} />
                  </Grid>
                  <Grid item xs={3}>
                    <NButton onClick={handleClick} >CopyId</NButton>
                  </Grid>
                  
                </Grid>
               
              </Grid>
              <Grid item xs={10}>
                <TextField id="filled-basic" variant='filled'  name='age' fullWidth={true} label="Email" disabled={true} value={user.email} />
              </Grid>
              
            </Grid>
      </UserInfoItemWrapper>
    </div>
  )
}

export default UserInfoTab1;