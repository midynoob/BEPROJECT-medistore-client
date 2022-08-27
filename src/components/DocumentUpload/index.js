import React, { useRef, useState, useEffect } from 'react'

import {Textfield,DateTimePicker, Button, Select, FileInput } from '../FormsUI';
import {Formik, Form} from 'formik';
import Icon1 from '../../images/add-button.svg';

import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import {Grid, Box,Container} from '@mui/material'
import {useStateValue} from '../../StateProvider';
import { NButton } from '../BaseWrapper';
import { SelectButton, ServicesCreateIcon } from './Elements';

const DocumentUpload = ({setDocument, handleNext,document}) => {
  const fileRef = useRef(null);

  const today = new Date().toISOString().substring(0,10);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if(document){
      setDoc(document)
    }
  
    
  }, [])
  

  const INITIAL_FORM_STATE = {
    document: doc
  };

  const FORM_VALIDATION = Yup.object().shape({
    document: Yup.mixed()
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
        console.log(values.document)
        setDocument(values.document);
        setDoc(values.document)
        handleNext();
      }}
    >

      {({setFieldValue}) => (
        <>
        {/* <button onClick={() => {fileRef.current.click();}} >Upload</button> */}
        <Form>
          <Grid container spacing={2}>
            
            <Grid item xs={12} style={{width: '100%'}}>
              <input 
              hidden
                ref={fileRef}
                id="file"  name="document" type="file" onChange={(event) => {
                setDoc(event.currentTarget.files[0])
                setFieldValue("document", event.currentTarget.files[0]);
              }} />
              
            
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item  style={{width: '100%'}} >
                <SelectButton onClick={() => {fileRef.current.click();}}><ServicesCreateIcon src={Icon1} />{doc? doc.name : ' '}</SelectButton>
                </Grid>
              </Grid>
              
            </Grid>

            

            
            
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <NButton
              style={{background: 'grey'}}
              disabled={true}
              type='button'
            >
              Back
            </NButton>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button type='submit' >
              Next
            </Button>
          </Box>

          
          

        </Form>
        </>
      )} 
      
    </Formik>
    </div>
  )
}

export default DocumentUpload;