import React , {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import { useStateValue } from '../../StateProvider';
import axios from '../../axios';
import {NButton} from '../BaseWrapper'

const DoctorsTable = ({params}) => {

  const [doctors, setDoctors] = useState([]);
  const [state, dispatch] = useStateValue();


  useEffect(() => {
    if(state?.userInfo ){
      axios({
        url: '/treatment/doctors',
        method: 'post',
        data: {
          uid: state.userInfo.userId,

          treatmentId: params.treatmentId,
  
        }
      }).then(res => {
        console.log('DOCTORS AREE ',res.data)
        dispatch({
          type: "SET_DOCTORS",
          doctors : res.data
        })
        
        
      }).catch(err => {
        alert(err);
      })
    }
      
    
    
    
  }, [state?.userInfo?.userId]);

  useEffect(() => {
    if(state) {
      setDoctors(state.doctors)
    }
    
  }, [state?.doctors]);


  const deleteDoctor = (doctorId) => {
    alert(params.treatmentId,doctorId)
    const arr = doctors.filter(item => item.doctorId !== doctorId);

    axios({
      url: '/treatment/doctor/delete',
      method: 'post',
      data: {
        uid: state.userInfo.userId,
        doctorId,
        treatmentId: params.treatmentId,

      }
    })
    .then(() => {
      console.log('doctor deleted')
      dispatch({
        type: 'SET_DOCTORS',
        doctors: arr
      })
    })
    .catch(err => {
      alert(err)
    })

    
  }

  return (
      <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 1110 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align="right">DoctorId</TableCell>
              <TableCell align="right"> </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors?.map((doc) => (
              <TableRow
                key={doc.doctorId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" style={{width: 500}}>{doc.name}</TableCell>
                <TableCell align="right">{doc.email}</TableCell>
                <TableCell align="right">{doc.doctorId}</TableCell>
                <TableCell align="left" style={{display: 'flex' , justifyContent: 'flex-end',width: 230}} >
                  <NButton style={{width : '100px'}} onClick={() => deleteDoctor( doc.doctorId)} >
                    Delete
                  </NButton>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default DoctorsTable