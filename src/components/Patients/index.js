import React, { useState, useEffect } from "react";
import { TContainer, TContainer2 } from "./PatientsElements";
import {
  Typography,
  Container,
  Box,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "../../axios";
import { useStateValue } from "../../StateProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [state, dispatch] = useStateValue();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    lineHeight: "60px",
    padding: "10px",
  }));

  useEffect(() => {
    console.log("xyz");
    if (state?.patients?.length === 0) {
      console.log("xyz2");
      axios({
        url: "/patients",
        method: "post",
        data: {
          uid: state.userInfo.userId,
        },
      })
        .then((res) => {
          console.log("P", res.data);
          //setTreatments(res.data)

          dispatch({
            type: "ADD_PATIENTS",
            patients: res.data,
          });
          setPatients(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo]);

  useEffect(() => {
    if (state) {
      setPatients(state.patients);
      console.log("in useeffect2");
    }
  }, [state?.patients]);

  return (
    <div>
      <TContainer>
        <TContainer2>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="strech"
            spacing={2}
          >
            <Grid item xs={12}>
              <Item elevation={1}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={2}>
                        <Typography align="left" variant="h5">
                          Patients
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">DOB</TableCell>
                                <TableCell align="right">Description</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {patients?.map((doc) => (
                                <TableRow
                                  key={doc.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <Link
                                      to={`/patient/treatments/${doc.id}`}
                                      key={doc.uid}
                                      style={{ color: "white" }}
                                    >
                                      {doc.name}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="right">
                                    {doc.age ? <>{doc.age}</> : <>N/A</>}
                                  </TableCell>
                                  <TableCell align="right">
                                    {doc.dOB ? doc.dOB : "N/A"}
                                  </TableCell>
                                  <TableCell align="right">
                                    {doc.description ? (
                                      <>{doc.description}</>
                                    ) : (
                                      <>N/A</>
                                    )}
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
    </div>
  );
};

export default Patients;
