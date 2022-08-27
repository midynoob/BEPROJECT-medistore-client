import React from 'react';
import {} from '../FormsUI';
import {Box, Grid } from '@mui/material';

import {Textfield,DateTimePicker, Button, Select, FileInput } from '../FormsUI';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { NButton } from '../BaseWrapper';

import {useStateValue} from '../../StateProvider';

const DocumentForm = ({handleSubmit, handleBack}) => {


  const today = new Date().toISOString().substring(0,10);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    documentName: '',
    documentDescription: '',
    documentDate: today,
    documentType: ''
  };


  const FORM_VALIDATION = Yup.object().shape({
    documentName: Yup.string()
      .required('Required')
      .min(5,'Must be minimum 5 Characters')
      .max(30,'Must be maximum 30 Characters'),
    documentDescription: Yup.string()
      .required('Required')
      .min(5,'Must be minimum 5 Characters')
      .max(200,'Must be maximum 200 Characters'),
    documentDate: Yup.date()
      .required('Required'),
    documentType:  Yup.string()
      .required('Required')
  });

  const Type = {
    'RP': 'Report',
    'RC': 'Reciept',
    'PE': 'Prescription',
    'Oh': 'Other'
  }

  return (
    <div>
      <Formik
      initialValues={{
        ...INITIAL_FORM_STATE
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={values => {
        //console.log(values);
        handleSubmit(values);
        // const data = {
        //   name : values.treatmentName,
        //   description : values.treatmentDescription,
        //   uid: state.userInfo.userId,
        //   startDate : new Date(values.startDate).toISOString(),
        // }
        // axios({
        //   url: '/createtreatment',
        //   method: 'post',
        //   data: {
        //     ...data
        //   }
        // })
        // .then(treatment => {
        //   console.log(treatment.data);
        //   dispatch({
        //     type: 'ADD_TREATMENT',
        //     treatment: treatment.data
        //   })

          
        // })
        // .catch(err => {
        //   alert(err);
        // })
        // navigate('/treatments');

        // console.log(data);
      }}
    >

      {/* {({setFieldValue}) => { */}
        <Form>
          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <Textfield id="filled-basic" name='documentName' fullWidth={true} label="Document Name"  />
            </Grid>
            <Grid item xs={6}>
              <Select variant='filled' options={Type} name='documentType' fullWidth={true} label="Document Type"  />
            </Grid>

            <Grid item xs={12}>
              <Textfield id="filled-multiline-static" name='documentDescription' rows={4} multiline fullWidth={true} label="Description"  />
            </Grid>

            <Grid item xs={12}>
              <DateTimePicker sx={{ width: 220 }} variant='filled'  name='documentDate' label='Doc Date' InputLabelProps={{ shrink: true,}} />
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
            
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <NButton
              disabled={false}
              type='button'
              onClick={handleBack}
            >
              Back
            </NButton>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button type='submit' >
              Submit
            </Button>
          </Box>

          
          

        </Form>
      {/* }} */}
      
      
    </Formik>
    
  </div>

  )
}

export default DocumentForm;