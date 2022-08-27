import React from 'react';
import { useFormikContext } from 'formik';
import styled from "styled-components";

const Button = styled.div`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 12px 44px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;

    }

`

const ButtonWrapper = ({
  children
}) => {


  

  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }



  return (
    <Button
      onClick={handleSubmit}
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;
