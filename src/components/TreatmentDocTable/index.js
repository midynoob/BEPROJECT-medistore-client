import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useStateValue } from "../../StateProvider";
import axios from "../../axios";
import { NButton } from "../BaseWrapper";

const TreatmentDocTable = ({ params, del }) => {
  const [docs, setDocs] = useState([]);
  const [state, dispatch] = useStateValue();
  console.log("xyz");

  useEffect(() => {
    if (state?.userInfo) {
      let uid;
      if (params.uid) {
        uid = params.uid;
      } else {
        uid = state.userInfo.userId;
      }
      console.log(uid, params);
      axios({
        url: "/docs",
        method: "post",
        data: {
          uid: uid,
          doctorId: state.userInfo.userId,

          treatmentId: params.treatmentId,
        },
      })
        .then((res) => {
          console.log(res.data);
          setDocs(res.data);
          dispatch({
            type: "SET_DOCS",
            docs: res.data,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo?.userId]);

  useEffect(() => {
    if (state) {
      setDocs(state.docs);
    }
  }, [state?.docs]);

  const deleteDoc = (treatmentId, fileId) => {
    alert(fileId);
    const arr = docs.filter((item) => item.docId !== fileId);
    axios({
      url: "/doc/delete",
      method: "post",
      data: {
        uid: state.userInfo.userId,
        treatmentId,
        fileId,
      },
    })
      .then((res) => {
        console.log("deleted");
        dispatch({
          type: "SET_DOCS",
          docs: arr,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1120 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              {del && <TableCell align="left"> </TableCell>}
              <TableCell align="left"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs?.map((doc) => (
              <TableRow
                key={doc.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: 400 }}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#fff" }}
                  >
                    {doc.name}{" "}
                  </a>
                </TableCell>
                <TableCell align="right" style={{ width: 400 }}>
                  {doc.description}
                </TableCell>
                <TableCell align="right" style={{ width: 150 }}>
                  {doc.type}
                </TableCell>
                <TableCell align="right" style={{ width: 200 }}>
                  {doc.date}
                </TableCell>

                {del && (
                  <TableCell
                    align="left"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: 230,
                    }}
                  >
                    <NButton
                      style={{ width: "100px" }}
                      onClick={() => deleteDoc(doc.treatmentId, doc.docId)}
                    >
                      Delete
                    </NButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TreatmentDocTable;
