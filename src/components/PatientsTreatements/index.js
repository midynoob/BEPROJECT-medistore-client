import React, { useState, useEffect } from "react";
import { TContainer, TContainer2 } from "../BaseWrapper";
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
import { styled } from "@mui/material/styles";
import {
  Typography,
  Container,
  Box,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  padding: "10px",
}));

const PatientsTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if (state?.alltreatments?.length === 0) {
      axios({
        url: "/alltreatments",
        method: "post",
        data: {
          uid: state.userInfo.userId,
        },
      })
        .then((res) => {
          console.log(res.data);
          //setTreatments(res.data)
          setTreatments(res.data);
          dispatch({
            type: "SET_ALLTREATMENTS",
            alltreatments: res.data,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo]);
  useEffect(() => {
    if (state) {
      setTreatments(state.alltreatments);
    }
  }, [state?.alltreatments]);

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
                      <Grid item xs={3}>
                        <Typography align="left" variant="h5">
                          Treatments Of ALL
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
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">User</TableCell>
                                <TableCell align="left">Description</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {treatments?.map((doc) => (
                                <TableRow
                                  key={doc.name}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <Link
                                      style={{ color: "#fff" }}
                                      to={`/patient/treatment/${doc.uid}/${doc.treatmentId}`}
                                    >
                                      {doc.name}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    {doc.startDate.substring(0, 10)}
                                  </TableCell>
                                  <TableCell align="left">{doc.uid}</TableCell>
                                  <TableCell align="left">
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
    </div>
  );
};

export default PatientsTreatments;
