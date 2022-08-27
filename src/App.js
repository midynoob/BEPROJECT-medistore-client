  import './App.css';

import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fAuth }  from './firebase';
import { useStateValue } from './StateProvider';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import axios from './axios';
import TreatmentsPage from './pages/TreatmentsPage';
import TreatmentPage from './pages/TreatmentPage';
import DocumentsPage from './pages/DocumentsPage';
import CreateTreatmentsPage from './pages/CreateTreatmentPage';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PatientsPage from './pages/PatientsPage';
import PatientsTreatmentsPage from './pages/PatientsTreatmentsPage';
import PatientTreatmentPage from './pages/PatientTreatmentPage';
import UserInfoPage from './pages/UserInfoPage';
import PatientTreatmentsPage from './pages/PatienTreatmentsPage';
import PredictPage from './pages/PredictPage'

function App() {

  const [state, dispatch] = useStateValue();

  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#fff',
      }
    },

    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: 'rgb(1, 191, 113)',
            },
            
          },
          }
        },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "::after": {
              borderBottom: '2px solid rgb(1, 191, 113)',
            },
            
          },
        }
      },
    },
  });

  useEffect(() => {
    const auth = fAuth.getAuth();
    fAuth.onAuthStateChanged(auth, (authUser) => {
      console.log('The User is >> ', authUser);

      if(authUser) {
        ////////////logged in / was already
        axios({
          url: '/user',
          method: 'post',
          data: {
            uid: authUser.uid
          }
        })
        .then(res => {
          dispatch({
            type: 'ADD_USERINFO',
            userInfo: res.data
          })
        })
        .catch(err => {
          alert(err);
        })
        
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
        dispatch({
          type: 'ADD_TREATMENTS',
          treatments: [],
        })
        dispatch({
          type: 'SET_ALLDOCS',
          docs: [],
        })
        dispatch({
          type: 'ADD_PATIENTS',
          patients: [],
        })
        dispatch({
          type: 'SET_ALLTREATMENTS',
          alltreatments: [],
        })
        dispatch({
          type: 'SET_DOCTORS',
          doctors: []
        })

      } else {
        //// logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
        dispatch({
          type: 'ADD_USERINFO',
          userInfo: null
        })
      }
    })

  }, []);

  return (

    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router>
      <div className="app">
        
        <Routes>
          

          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route exact path='/' element={<Home/>} />
          
          
            <Route path='/treatments' element={<TreatmentsPage/>} />  
            <Route exact path='/treatments/create' element={<CreateTreatmentsPage/>} /> 
            <Route path='/treatments/:treatmentId' element={<TreatmentPage/>} />
          
            <Route path='/documents' element={<DocumentsPage/>} /> 


            <Route path='/patients' element={<PatientsPage/>} /> 
            <Route path='/patient/treatments/:id' element={<PatientTreatmentsPage/>} /> 
            <Route path='/patient/treatment/:uid/:treatmentId' element={<PatientTreatmentPage/>} /> 
            
            <Route path='/patients/treatments' element={<PatientsTreatmentsPage/>} /> 

            <Route path='/userInfo' element={<UserInfoPage/>} /> 
            <Route path='/Predict' element={<PredictPage/>} /> 
          
        </Routes>
        
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
