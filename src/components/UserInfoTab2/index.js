import React, {useEffect, useState} from 'react';
import {Grid } from '@mui/material';
import { TContainer, TContainer2,NButton } from './UserInfoElements';

import {Textfield,DateTimePicker, Button, Select, FileInput } from '../FormsUI';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

import {useStateValue} from '../../StateProvider';


const UserInfoTab2 = () => {

  const today = new Date().toISOString().substring(0,10);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [disabled, setDisabled] = useState(true)
  console.log(userInfo)
  useEffect(() => {
    if(state){
      setUserInfo(state.userInfo)
    }
  }, [state?.userInfo])

  const handleUpdate = () => {
    setDisabled(!disabled)
  }
  const handleCancle = (resetForm) => {
    setDisabled(!disabled)
    resetForm()
  }

  const INITIAL_FORM_STATE = {
    name: userInfo?.name ? userInfo.name : '',
    age: userInfo?.age ? userInfo.age : '',
    bloodGroup: userInfo?.bloodGroup ? userInfo.bloodGroup : '',
    gender: userInfo?.gender ? userInfo.gender : '',
    description: userInfo?.description ? userInfo.description : '',
    dOB: userInfo?.dOB ? userInfo.dOB : today,
  };


  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .min(5,'Must be minimum 5 Characters')
      .max(30,'Must be maximum 30 Characters'),
    age: Yup.string()
      .required('Required'),
    description: Yup.string()
      .required('Required')
      .min(5,'Must be minimum 5 Characters')
      .max(200,'Must be maximum 200 Characters'),
    dOB: Yup.date()
      .required('Required'),
    bloodGroup:  Yup.string()
      .required('Required'),
    gender:  Yup.string()
      .required('Required')
  });

  const BloodGroup = {
    'A+': 'A+',
    'B+': 'B+',
    'AB+': 'AB+',
    'O+': 'O+',
    'A-': 'A-',
    'B-': 'B-',
    'AB-': 'AB-',
    'O-': 'O-'
  }
  const Gender = {
    'Male' : 'Male',
    'Female' : 'Female',
    'Others' : 'Others'
  }


  return(
    <TContainer>
        <Formik
        enableReinitialize
        initialValues={{
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          console.log(values);
          const data = {
            name: values.name,
            age: values.age,
            description: values.description,
            dOB: values.dOB,
            bloodGroup: values.bloodGroup,
            gender: values.gender,
            uid: state.userInfo.userId
  
          }
          axios({
            url: '/user/update',
            method: 'post',
            data: data
          })
          .then(user => {
            console.log(user)
            setDisabled(true)
            dispatch({
              type: 'ADD_USERINFO',
              userInfo: user.data
            })
          })
          navigate('/userInfo')
        }}
      >
  
        {({resetForm}) => (
          <Form >
            <Grid container spacing={4}>
              
              <Grid item xs={6}>
                <Textfield id="filled-basic" name='name' fullWidth={true} label="Name" disabled={disabled}  />
              </Grid>
              <Grid item xs={6}>
                <Textfield id="filled-basic" name='age' fullWidth={true} label="Age" disabled={disabled} />
              </Grid>
              <Grid item xs={6}>
                <Select variant='filled' options={BloodGroup} name='bloodGroup' fullWidth={true} label="Blood Type" disabled={disabled} />
              </Grid>
              <Grid item xs={6}>
                <Select variant='filled' options={Gender} name='gender' fullWidth={true} label="Gender" disabled={disabled}  />
              </Grid>
  
              <Grid item xs={12}>
                <Textfield id="filled-multiline-static" name='description' rows={4} multiline fullWidth={true} label="Description" disabled={disabled} />
              </Grid>
  
              <Grid item xs={12}>
                <DateTimePicker sx={{ width: 220 }} variant='filled'  name='dOB' label='DOB' InputLabelProps={{ shrink: true,}} disabled={disabled} />
              </Grid>
  
              {/* <Grid item xs={12}>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      renderInput={(params) => <TextField {...params} />}
                      fullWidth={true}
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      
                    />
                  </LocalizationProvider>
              </Grid>
              </Grid> */}
              <Grid item >
                <Button>Submit</Button>
              </Grid>
              <Grid item >
                {disabled ? (
                  <NButton type='button' onClick={handleUpdate} >Update</NButton>
                ) : (
                  <NButton type='button' onClick={() => handleCancle(resetForm)} >Cancle</NButton>
                )}
              </Grid>
            </Grid>
  
            
            
  
          </Form>
        )} 
        
      </Formik>
  
  
  
      </TContainer>
  )
  
}

export default UserInfoTab2;