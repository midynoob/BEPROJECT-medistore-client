import React, { useRef, useState } from "react";
import { TContainer, TContainer2 } from "../BaseWrapper";
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
import { styled } from "@mui/material/styles";
import {
  Textfield,
  DateTimePicker,
  Button,
  Select,
  FileInput,
} from "../FormsUI";
import Icon1 from "../../images/add-button.svg";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { NButton } from "../BaseWrapper";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import axiosPAPI from "../../axiosPAPI";
import { width } from "@mui/system";
import { SelectButton, ServicesCreateIcon } from "./Elements";
Chart.register(ArcElement);
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

const Predict = () => {
  const fileRef = useRef(null);
  const formData = new FormData();
  const [imgUrl, setImgUrl] = useState("");
  const [chartData, setChartData] = useState({});
  const [doc, setDoc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [nsv, setNsv] = useState({ N: 0, S: 0, V: 0 });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const INITIAL_FORM_STATE = {
    document: doc,
  };

  const FORM_VALIDATION = Yup.object().shape({
    document: Yup.mixed().required("Required"),
  });
  const data = {
    labels: ["N", "S", "V"],
    datasets: [
      {
        label: "ECG",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 2,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Doughnut Chart",
        color: "blue",
        font: {
          size: 34,
        },
        padding: {
          top: 30,
          bottom: 30,
        },
        responsive: true,
        animation: {
          animateScale: true,
        },
      },
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            width="100%"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              width="200px"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                style={{
                  background: "rgb(255, 99, 132)",
                  textAlign: "center",
                  margin: "10px",
                }}
              >
                &nbsp; N:{(nsv.N * 100).toFixed(2)} &nbsp;
              </div>
              <div
                style={{
                  background: "rgb(54, 162, 235)",
                  textAlign: "center",
                  margin: "10px",
                }}
              >
                &nbsp;S:{(nsv.S * 100).toFixed(2)}&nbsp;
              </div>
              <div
                style={{
                  background: "rgb(255, 205, 86)",
                  textAlign: "center",
                  margin: "10px",
                }}
              >
                &nbsp;V:{(nsv.V * 100).toFixed(2)}&nbsp;
              </div>
            </div>
          </div>
          <Doughnut data={chartData} options={options} />
        </Box>
      </Modal>

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
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h4" style={{ fontWeight: "800" }}>
                      Predict
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Formik
                      initialValues={{
                        ...INITIAL_FORM_STATE,
                      }}
                      validationSchema={FORM_VALIDATION}
                      onSubmit={(values) => {
                        formData.append("document", values.document);
                        axios({
                          url: "/predict",
                          method: "post",
                          data: formData,
                          headers: { "Content-Type": "multipart/form-data" },
                        })
                          .then((res) => {
                            console.log(res.data);
                            setImgUrl(res.data.imageUrl);

                            axiosPAPI({
                              url: `/?q=${res.data.imageFileName}`,
                              method: "get",
                            }).then((res) => {
                              console.log(res.data);
                              setChartData({
                                labels: ["N", "S", "V"],
                                datasets: [
                                  {
                                    label: "ECG",
                                    data: [res.data.N, res.data.S, res.data.V],
                                    backgroundColor: [
                                      "rgb(255, 99, 132)",
                                      "rgb(54, 162, 235)",
                                      "rgb(255, 205, 86)",
                                    ],
                                    hoverOffset: 2,
                                  },
                                ],
                              });
                              setNsv(res.data);
                              handleOpen();
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      {({ setFieldValue }) => (
                        <>
                          {/* <button onClick={() => {fileRef.current.click();}} >Upload</button> */}
                          <Form>
                            <Grid
                              container
                              spacing={2}
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              style={{ width: "100%" }}
                            >
                              <Grid item>
                                <input
                                  hidden
                                  ref={fileRef}
                                  id="file"
                                  name="document"
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "document",
                                      event.currentTarget.files[0]
                                    );
                                    setDoc(event.currentTarget.files[0]);
                                  }}
                                />
                              </Grid>
                              <Grid
                                item
                                style={{ width: "350px", height: "350px" }}
                              >
                                <SelectButton
                                  onClick={() => {
                                    fileRef.current.click();
                                  }}
                                >
                                  <ServicesCreateIcon src={Icon1} />
                                  {doc ? doc.name : " "}
                                </SelectButton>
                              </Grid>

                              <Grid
                                item
                                style={{
                                  height: "100px",
                                  lineHeight: "28px",
                                  width: "150px",
                                  marginTop: "10px",
                                }}
                              >
                                <Button>Submit</Button>
                              </Grid>
                            </Grid>
                          </Form>
                        </>
                      )}
                    </Formik>
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

export default Predict;
