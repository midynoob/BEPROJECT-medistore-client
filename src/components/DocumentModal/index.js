import React, { useState } from 'react';
import { Stepper,Typography, Step, StepLabel,Box,Button, StepContent } from '@mui/material';
import DocumentForm from '../DocumentForm';
import DocumentUpload from '../DocumentUpload';
import {useStateValue} from '../../StateProvider';
import { useParams } from 'react-router-dom';
import axios from '../../axios';



//const steps = ['Select File', 'Create an ad group', 'Document Details'];


const steps = ['Select File','Document Details'];

const DoucmentModal = ({handleClose}) => {

  const [activeStep, setActiveStep] = useState(0);
  const [document, setDocument] = useState(null);
  const [state, dispatch] = useStateValue();
  const params = useParams();



  const handleSubmit = (values) => {
      const formData = new FormData();
      formData.append('document',document);
      formData.append('documentName',values.documentName);
      formData.append('documentDescription',values.documentDescription);
      formData.append('documentDate',values.documentDate);
      formData.append('documentType',values.documentType);
      formData.append('uid',state.userInfo.userId);
      formData.append('treatmentId',params.treatmentId);

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    axios({
      url: '/upload',
      method: 'post',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: 'ADD_DOC',
        doc: res.data
      })
      dispatch({
        type: 'ADD_ALLDOC',
        doc: res.data
      })
      handleClose();
    })
    .catch(err=> {
      console.log(err);
    })
  }
  
  // const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };
  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };
  
  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 1 ?  (
            <>
              <DocumentForm handleSubmit={handleSubmit} handleBack={handleBack} />
            </>
          ) : (
            <>
              <DocumentUpload setDocument={setDocument} handleNext={handleNext} document={document} />
            </>
          )}
          
        </React.Fragment>
      )}
    </Box>
    </div>
  )
}

export default DoucmentModal