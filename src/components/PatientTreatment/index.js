import React, { useState, useEffect } from "react";
import {
  TContainer2,
  TContainer,
} from "../PatientTreatments/PatientTreatmentsElements";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "../../axios";
import { useStateValue } from "../../StateProvider";
import TreatmentDocTable from "../TreatmentDocTable";

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

const PatientTreatment = () => {
  console.log("xyzout treatment    ");

  const [treatment, setTreatment] = useState();
  const params = useParams();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if (state?.userInfo) {
      console.log("inside treatment use effect", params);
      axios({
        url: "patient/treatment",
        method: "post",
        data: {
          doctorUid: state.userInfo.userId,
          treatmentId: params.treatmentId,
          uid: params.uid,
        },
      })
        .then((res) => {
          console.log(res.data);
          setTreatment(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo]);

  return (
    <div>
      <TContainer>
        <TContainer2 maxWidth="lg">
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
                  <Grid item>
                    <Typography variant="h5">Paitent Info</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <b>Email: </b>
                      {treatment?.patient.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item elevation={1}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography variant="h5">Treatment Info</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <b>Name: </b>
                      {treatment?.treatment.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <b>Start Date: </b>
                      {treatment?.treatment.startDate?.substring(0, 10)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <b>Description: </b>
                      {treatment?.treatment?.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {/* <TreatmentDocTable params={params} /> */}
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item elevation={1}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {/* <Grid item xs={12} style={{width: '100%'}} >
                            <Grid container justifyContent="space-between" >
                              <Grid item xs={2}>
                                <Typography variant='h5'>Documents</Typography>
                              </Grid>
                            </Grid>
                          
                        </Grid> */}
                  <Grid item>
                    <Typography variant="h5">Documents </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {console.log("xyzzzzz")}
                    <TreatmentDocTable params={params} del={false} />
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

export default PatientTreatment;
