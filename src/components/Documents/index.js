import React , {useState, useEffect} from 'react';
import { TContainer, TContainer2 } from './DocumentsElements';
import { Typography,Container,Box, Grid,Modal, Backdrop, Fade } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import { NButton } from '../BaseWrapper'
const Documents = () => {

  const [docs, setDocs] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if(state?.alldocs?.length === 0) {
        axios({
            url: '/alldocs',
            method: 'post',
            data: {
                uid: state.userInfo.userId
            }
        }).then(res => {
            //setTreatments(res.data)
            dispatch({
                type: "SET_ALLDOCS",
                docs: res.data
            })
        }).catch(err => {
            alert(err);
        })
    }

  }, [state?.userInfo])
  
  useEffect(() => {
    if(state) {
      let arr = state.alldocs;
      arr.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : (b.createdAt < a.createdAt) ? -1 : 0)
      setDocs(arr)
    }
    
  }, [state?.alldocs])


  const deleteDoc = (treatmentId, fileId) => {
    alert(fileId)
    const arr = docs.filter(item => item.docId !== fileId);
    console.log(arr)
    axios({
      url: '/doc/delete',
      method: 'post',
      data: {
        uid: state.userInfo.userId,
        treatmentId,
        fileId
      }
    })
    .then(res => {
      console.log('deleted')
      dispatch({
        type: 'SET_ALLDOCS',
        docs: arr
      })
    })
    .catch(err => {
      alert(err)
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    lineHeight: '60px',
    padding: '10px'
  }));

  return (
    <TContainer>
      <TContainer2>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="strech"
        spacing={2}
      >
        <Grid item xs={12} >
          <Item elevation={1}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12} style={{width: '100%'}} >
                <Grid container justifyContent="space-between" >
                  <Grid item xs={2}>
                    <Typography align='left' variant='h5'>Documents</Typography>
                  </Grid>


                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Description</TableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {docs?.map((doc) => (
                            <TableRow
                              key={doc.docId}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {doc.name}
                              </TableCell>
                              <TableCell align="left">{doc.type}</TableCell>
                              <TableCell align="left">{doc.date}</TableCell>
                              <TableCell align="left">{doc.description}</TableCell>
                              <TableCell align="right">
                                <NButton style={{maxWidth: '100px' }} onClick={() => deleteDoc(doc.treatmentId, doc.docId)} >
                                  Delete
                                </NButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>


                  
                </Grid>
              
              </Grid>
            </Grid>
          </Item>
          
        </Grid>
      </Grid>
      </TContainer2>
    </TContainer>
  )
}

export default Documents;