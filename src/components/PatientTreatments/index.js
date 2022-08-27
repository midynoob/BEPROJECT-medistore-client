import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { TContainer, TContainer2 } from "./PatientTreatmentsElements";
import {
  Typography,
  Container,
  Box,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "../../axios";

const PatientTreatments = () => {
  const params = useParams();
  const [state, dispatch] = useStateValue();
  const [treatments, setTreatments] = useState([]);
  const [patientName, setPatientName] = useState("");

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    lineHeight: "60px",
    padding: "10px",
  }));

  useEffect(() => {
    if (state) {
      axios({
        url: "/patient/treatments",
        method: "post",
        data: {
          doctorsUid: state.userInfo.userId,
          docId: params.id,
        },
      })
        .then((res) => {
          console.log(res.data);
          setTreatments(res.data.treatments);
          setPatientName(res.data.patientName);
          dispatch({
            type: "ADD_PATIENTTREATMENTS",
            treatments: res.data.treatments,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo]);

  useEffect(() => {
    if (state) {
      setTreatments(state.patientTreatments);
    }
  }, [state?.patientTreatments]);

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
                    <Grid item xs={5}>
                      <Typography align="left" variant="h5">
                        Treatments of {patientName}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Start Date</TableCell>
                              <TableCell align="right">Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {treatments?.map((doc) => (
                              <TableRow
                                key={doc.treatmentId}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <Link
                                    to={`/patient/treatment/${doc.uid}/${doc.treatmentId}`}
                                    key={doc.treatmentId}
                                    style={{ color: "white" }}
                                  >
                                    {doc.name}
                                  </Link>
                                </TableCell>
                                {/* <TableCell align="left">{doc.startDate === null ? (<>{doc.startDate}</> ) : (<>N/A</>) }</TableCell>
                              <TableCell align="left">{doc.description=== null ? (<>{doc.description}</> ) : (<>N/A</>) }</TableCell> */}
                                <TableCell align="right">
                                  {doc.startDate.substring(0, 10)}
                                </TableCell>
                                <TableCell align="right">
                                  {doc.description}
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
  );
};

export default PatientTreatments;
