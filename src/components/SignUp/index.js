import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import {fAuth} from '../../firebase'; 
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import {Grid } from '@mui/material';

import {Textfield,DateTimePicker, Button, Select, FileInput } from '../FormsUI';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();
  const [state,dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = fAuth.getAuth();


  const Type = {
    'doctor' : 'Doctor',
    'patient': 'Patient'
  }

  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    type: ''
  };
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .email('Must be an email'),
    password: Yup.string()
      .required('Required')
      .min(6,'Must be minimum 6 Characters')
      .max(20,'Must be maximum 20 Characters'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'),null], 'Password must match'),

    name: Yup.string()
      .required('Required')
      .min(3,'Must be minimum 6 Characters')
      .max(40,'Must be maximum 40 Characters'),
    type: Yup.string()
      .required('Required')
  });

  const register = (e) => {
    e.preventDefault();

    fAuth.createUserWithEmailAndPassword(auth,email,password)
      .then((auth) => {
        console.log(auth);
        if(auth) {
          axios({
            url: '/signup',
            method: 'post',
            data: {
              email,
              uid: auth.user.uid
            }
          })
          .then(userInfo => {
            console.log(userInfo);
            dispatch({
              type: 'ADD_USERINFO',
              userInfo
            })
          })
          .catch(err => {
            alert(err);
          })
          navigate('/');
        }
      })
      .catch(error => {
        if(error.message === "Firebase: Error (auth/email-already-in-use).") alert("email already in user");
        else alert(error.message)
      })

    //firebase register
  }

  return (
    // <div> 
    //   <div className='login' >
    //     <Link to='/'>
    //       medistore
    //     </Link>
    //     <div className="login__container">
    //       <h1>Sign-Up</h1>
    //         <form>

             

    //           <h5>
    //               E-mail
    //           </h5>
    //           <input type='text' 
    //               value={email}
    //               onChange={e => setEmail(e.target.value)}
    //           />

    //           <h5>
    //               Password
    //           </h5>
    //           <input type='password' 
    //               value={password}
    //               onChange={e => setPassword(e.target.value)}
                  
    //           />

    //           <button onClick={register} className='login__registerButton' >Create your Amazon Account</button>
    //           <Link to='/signin' >SignIn</Link>
    //         </form>
    //       </div>
            
    //     </div>
    // </div>

    <div>
      <Formik
      initialValues={{
        ...INITIAL_FORM_STATE
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={values => {
        fAuth.createUserWithEmailAndPassword(auth,values.email,values.password)
      .then((auth) => {
        console.log(auth);
        if(auth) {
          axios({
            url: '/signup',
            method: 'post',
            data: {
              email: values.email,
              uid: auth.user.uid,
              name: values.name,
              type: values.type,
            }
          })
          .then(userInfo => {
            console.log(userInfo);
            dispatch({
              type: 'ADD_USERINFO',
              userInfo
            })
          })
          .catch(err => {
            alert(err);
          })
          navigate('/');
        }
      })
      .catch(error => {
        if(error.message === "Firebase: Error (auth/email-already-in-use).") alert("email already in user");
        else alert(error.message)
      })
      }}
    >

        <Form>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <Link to='/' style={{color: '#fff'}}>
                <h1>medistore</h1>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <h3 style={{color: '#01bf71'}}>Sign-Up</h3>
            </Grid>
            <Grid item xs={12}>
              <Textfield id="filled-multiline-static" name='email'  fullWidth={true} label="Email"  />
            </Grid>
            <Grid item xs={12}>
              <Textfield id="filled-multiline-static" name='password'  fullWidth={true} label="Password"  />
            </Grid>
            <Grid item xs={12}>
              <Textfield id="filled-multiline-static" name='confirmPassword'  fullWidth={true} label="Confirm password"  />
            </Grid>
            <Grid item xs={12}>
              <Textfield id="filled-basic" name='name' fullWidth={true} label="Name"  />
            </Grid>
            <Grid item xs={6}>
              <Select variant='filled' options={Type} name='type' fullWidth={true} label="Type"  />
            </Grid>
            

            

            

            
            <Grid item >
              <Button>Submit</Button>
            </Grid>
            <Grid item xs={6}>
              Already Have an Account? 
              <Link to= '/signin'>
                <h3 style={{color: '#01bf71'}}>Log-in</h3>
              </Link>
              
            </Grid>
          </Grid>

          
          

        </Form>
      
    </Formik>
  </div>
  )



}

export default Signup;