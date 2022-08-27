import React, { useEffect, useState } from "react";

import {
  Textfield,
  DateTimePicker,
  Button,
  Select,
  FileInput,
} from "../FormsUI";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../StateProvider";
import { NButton } from "../BaseWrapper";
import { Grid } from "@mui/material";
import { lineHeight } from "@mui/system";

const TreatmentInfoSection = ({ treatment }) => {
  console.log(treatment);

  const today = new Date().toISOString().substring(0, 10);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [treat, setTreat] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (treatment) {
      setTreat(treatment);
    }
  }, [treatment]);

  const handleUpdate = () => {
    setDisabled(!disabled);
  };
  const handleCancle = (resetForm) => {
    setDisabled(!disabled);
    resetForm();
  };

  const INITIAL_FORM_STATE = {
    name: treat?.name ? treat.name : "",
    startDate: treat?.startDate ? treat.startDate.substring(0, 10) : "",
    description: treat?.description ? treat.description : "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(5, "Must be minimum 5 Characters")
      .max(30, "Must be maximum 30 Characters"),
    description: Yup.string()
      .required("Required")
      .min(5, "Must be minimum 5 Characters")
      .max(200, "Must be maximum 200 Characters"),
    dOB: Yup.date().required("Required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => {
        console.log(values);
        const data = {
          name: values.name,
          age: values.age,
          description: values.description,
          dOB: values.dOB,
          bloodGroup: values.bloodGroup,
          gender: values.gender,
          uid: state.userInfo.userId,
        };
        axios({
          url: "/user/update",
          method: "post",
          data: data,
        }).then((user) => {
          console.log(user);
          setDisabled(true);
          dispatch({
            type: "ADD_USERINFO",
            userInfo: user.data,
          });
        });
        navigate("/userInfo");
      }}
    >
      {({ resetForm }) => (
        <Form>
          <Grid
            style={{ position: "relative", margin: 0, paddingBottom: 20 }}
            container
            spacing={2}
            width={600}
          >
            <Grid item xs={6}>
              <Textfield
                id="filled-basic"
                name="name"
                fullWidth={true}
                label="Name"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker
                sx={{ width: 270 }}
                variant="filled"
                name="startDate"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                disabled={disabled}
              />
            </Grid>

            <Grid item xs={12}>
              <Textfield
                id="filled-multiline-static"
                name="description"
                rows={4}
                multiline
                fullWidth={true}
                label="Description"
                disabled={disabled}
              />
            </Grid>

            {/* <Grid item style={{width: 160, height: 50, color: '#fff',lineHeight: '26px'}} >
                <Button  >Submit</Button>
              </Grid>
              <Grid item >
                {disabled ? (
                  <NButton style={{width: 140, height: 50}} type='button' onClick={handleUpdate} >Update</NButton>
                ) : (
                  <NButton style={{width: 140, height: 50}} type='button' onClick={() => handleCancle(resetForm)} >Cancle</NButton>
                )}
              </Grid> */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default TreatmentInfoSection;
