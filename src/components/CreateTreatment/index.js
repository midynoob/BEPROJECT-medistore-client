import React, { useState } from 'react';
import { CTContainer, InputLabel  } from './CreateTreatmentElements';
import {useStateValue} from '../../StateProvider';
// import { Link } from 'react-router-dom';
import { Grid, Container, TextField} from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import {DatePicker} from '@mui/lab';
import {Textfield,DateTimePicker, Button} from '../FormsUI';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';


const CreateTreatment = () => {

  const today = new Date().toISOString().substring(0,10);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();


  console.log(today);  

  const INITIAL_FORM_STATE = {
    treatmentName: '',
    treatmentDescription: '',
    startDate: today,
  };
  
  const FORM_VALIDATION = Yup.object().shape({
    treatmentName: Yup.string()
      .required('Required')
      .min(5,'Must be minimum 5 Characters')
      .max(30,'Must be maximum 30 Characters'),
    treatmentDescription: Yup.string()
      .required('Required')
      .min(10,'Must be minimum 5 Characters')
      .max(200,'Must be maximum 200 Characters'),
    startDate: Yup.date()
      .required('Required')
  });

  return (


    <CTContainer>
      <Container maxWidth='md'>
        <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log(values);
                const data = {
                  name : values.treatmentName,
                  description : values.treatmentDescription,
                  uid: state.userInfo.userId,
                  startDate : new Date(values.startDate).toISOString(),
                }
                axios({
                  url: '/createtreatment',
                  method: 'post',
                  data: {
                    ...data
                  }
                })
                .then(treatment => {
                  console.log(treatment.data);
                  dispatch({
                    type: 'ADD_TREATMENT',
                    treatment: treatment.data
                  })

                  
                })
                .catch(err => {
                  alert(err);
                })
                navigate('/treatments');

                console.log(data);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Textfield id="filled-basic" name='treatmentName' fullWidth={true} label="Name"  />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield id="filled-multiline-static" name='treatmentDescription' rows={4} multiline fullWidth={true} label="Description"  />
                  </Grid>

                  <Grid item xs={12}>
                    <DateTimePicker sx={{ width: 220 }} variant='filled'  name='startDate' label='Start Date' InputLabelProps={{ shrink: true,}} />
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
                </Grid>

                
                

              </Form>
            </Formik>
      </Container>
      
      
    </CTContainer>
  )
}

export default CreateTreatment;