import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fAuth } from "../../firebase";
import axios from "../../axios";
import { useStateValue } from "../../StateProvider";

import { Grid } from "@mui/material";

import {
  Textfield,
  DateTimePicker,
  Button,
  Select,
  FileInput,
} from "../FormsUI";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = fAuth.getAuth();

  const signIn = (e) => {
    e.preventDefault();

    fAuth
      .signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth.user.uid);

        navigate("/");
      })
      .catch((error) => alert(error.message));
    //firebase login
  };

  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Required").email("Must be an email"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be minimum 6 Characters")
      .max(20, "Must be maximum 20 Characters"),
  });

  return (
    <div>
      <div className="login">
        <Link to="/" style={{ color: "#fff" }}>
          <h1>medistore</h1>
        </Link>
        <div className="login__container">
          <h3 style={{ color: "#01bf71" }}>Sign-In</h3>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              fAuth
                .signInWithEmailAndPassword(auth, values.email, values.password)
                .then((auth) => {
                  console.log(auth.user.uid);

                  navigate("/");
                })
                .catch((error) => alert(error.message));
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Textfield
                    id="filled-multiline-static"
                    name="email"
                    fullWidth={true}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textfield
                    type="password"
                    id="filled-multiline-static"
                    name="password"
                    fullWidth={true}
                    label="Password"
                  />
                </Grid>

                <Grid item>
                  <Button>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                  Dont Have an Account?
                  <Link to="/signup">
                    <h3 style={{ color: "#01bf71" }}>Signup</h3>
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
