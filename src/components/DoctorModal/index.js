import React from 'react';
import {} from '../FormsUI';
import {Grid } from '@mui/material';

import {Textfield,DateTimePicker, Button, Select, FileInput } from '../FormsUI';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

import {useStateValue} from '../../StateProvider';




const DoctorModal = ({handleClose}) => {


  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const params = useParams();

  const INITIAL_FORM_STATE = {
    doctorId: ''
  };
  const FORM_VALIDATION = Yup.object().shape({
    doctorId: Yup.string()
      .required('Required')
  });

  return (
    <div>
      <Formik
      initialValues={{
        ...INITIAL_FORM_STATE
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={values => {
        console.log(values);


        //handleSubmit(values);


        const data = {
          doctorId: values.doctorId,
          uid: state.userInfo.userId,
          treatmentId: params.treatmentId
        }
        axios({
          url: '/treatmentadddoctor',
          method: 'post',
          data: {
            ...data
          }
        })
        .then(res => {
          console.log(res.data);
          dispatch({
            type: 'ADD_DOCTOR',
            doctor: res.data
          })
          console.log()
          handleClose();
          
        })
        .catch(err => {
          alert(err);
        })
        // navigate('/treatments');

        // console.log(data);
      }}
    >

        <Form>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <Textfield id="filled-basic" name='doctorId' fullWidth={true} label="Doctor Id"  />
            </Grid>
            
            <Grid item >
              <Button>Submit</Button>
            </Grid>
          </Grid>

          
          

        </Form>
      
    </Formik>
  </div>
  )
}

export default DoctorModal;