import React, { useEffect, useState } from "react";
import { TContainer, TContainer2, Button } from "./TreatmentElements";
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
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "../../axios";
import { useStateValue } from "../../StateProvider";
import DocumentModal from "../DocumentModal";
import TreatmentDocTable from "../TreatmentDocTable";
import DoctorModal from "../DoctorModal";
import { NButton } from "../BaseWrapper";
import DoctorsTable from "../DoctorsTable";
import { Textfield, DateTimePicker, Select, FileInput } from "../FormsUI";
import TreatmentInfoSection from "../TreatmentInfoSection";

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

const Treatment = () => {
  const [treatment, setTreatment] = useState();
  const params = useParams();
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.userInfo) {
      axios({
        url: "/treatment",
        method: "post",
        data: {
          uid: state.userInfo.userId,
          treatmentId: params.treatmentId,
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

  const handleTreatmentDelete = () => {
    const uid = state.userInfo.userId;
    const treatmentId = params.treatmentId;
    console.log(uid, treatmentId);
    const arr = state.treatments.filter(
      (item) => item.treatmentId !== treatmentId
    );
    axios({
      url: "treatment/delete",
      method: "post",
      data: {
        uid,
        treatmentId,
      },
    }).then(() => {
      console.log("treatmnet deleted");
      dispatch({
        type: "ADD_TREATMENTS",
        treatments: arr,
      });
      dispatch({
        type: "SET_ALLDOCS",
        docs: [],
      });
      navigate("/treatments");
    });
  };

  const [open, setOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDoctorForm = () => setDocOpen(true);
  const handleCloseDoctorForm = () => setDocOpen(false);

  return (
    <TContainer style={{ paddingBottom: 100 }}>
      {/* Document MOdal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <DocumentModal handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>

      {/* Doctor Modal */}
      <Modal
        open={docOpen}
        onClose={handleCloseDoctorForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={docOpen}>
          <Box sx={style}>
            <DoctorModal handleClose={handleCloseDoctorForm} />
          </Box>
        </Fade>
      </Modal>
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
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  style={{ width: "100%" }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item xs={2}>
                      <Typography variant="h5">Treatment Info</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <NButton
                        style={{ height: "50px" }}
                        onClick={handleTreatmentDelete}
                      >
                        Delete
                      </NButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TreatmentInfoSection treatment={treatment} />
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
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={2}>
                      <Typography variant="h5">Doctors</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Button onClick={handleOpenDoctorForm}>+</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DoctorsTable params={params} />
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
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={2}>
                      <Typography variant="h5">Documents</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Button onClick={handleOpen}>+</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TreatmentDocTable params={params} del={true} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </TContainer2>
    </TContainer>
  );
};

export default Treatment;
