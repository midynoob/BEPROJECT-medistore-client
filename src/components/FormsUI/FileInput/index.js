import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const FilefieldWrapper = ({
  name,
  children,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'filled',
    type: 'file',

  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
      <TextField {...configTextfield} >{children}</TextField>
    
  );
};

export default FilefieldWrapper;
