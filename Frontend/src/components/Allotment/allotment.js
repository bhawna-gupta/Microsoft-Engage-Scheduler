import { DatatGrid } from "@material-ui/data-grid";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  Select,
  MenuItem,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import UserProfile from "../UserProfile";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyle = makeStyles({
  datagrid: {
    color: "#F2F9F6",
    "&.MuiDataGrid-footer": {
      color: "#F2F9F6",
    },
  },
});
const Allotment = () => {
  const classes = useStyles();
  const grid_class = useStyle();
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const classname = UserProfile.getClass();
  const [noTrans, setNoTrans] = useState(false);
  const token = UserProfile.getToken();
  const [requests, setRequests] = useState([]);
  const No_Transactions = () => (
    <>
      <div className={classes.notrans_div}>
        <div className={classes.notrans}>
          <div className={classes.imgdiv}>
            <img src={Image} height="100px" />
          </div>
          <h3>No transactions</h3>
          <h5>Couldn't fetch any transactions for this month</h5>
        </div>
      </div>
    </>
  );
  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin/dashboard/${classname}`, {
        headers: { token: `${token}` },
      })
      .then((response) => response.data)
      .then((requestsData) => {
        console.log(requestsData);
        setRequests(requestsData.data);
        setNoTrans(false);
        setOpen(true);
      })
      .catch((error) => {
        // if (error.response.status === 404) {
        //   setTransactions([]);
        //   setNoTrans(true);
        // }
      });
  }, []);
  const ExportToolbar = () => (
    <>
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    </>
  );
  const Success = () => (
    <Dialog className={classes.dialog} open={open}>
      <DialogTitle>
        <CheckCircleOutlineIcon style={{ color: "green", fontSize: "100px" }} />{" "}
        <br />
        Successfully Submitted!
      </DialogTitle>
      <Link
        to="/student/dashboard"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Button style={{ width: "100%" }} variant="contained" color="primary">
          Ok
        </Button>
      </Link>
    </Dialog>
  );
  return (
    <>
      <div className={classes.main}>
        <div className={classes.paper_container}>
          <Paper className={classes.paper}>
            <div className={classes.backbutton}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/dashboard"
              >
                <Button variant="contained" size="small">
                  <KeyboardBackspaceIcon />
                </Button>
              </Link>
            </div>
            <h2 className={classes.heading}></h2>

            <div className={classes.grid}>
              <DataGrid
                className={grid_class.datagrid}
                page={page}
                onPageChange={(params) => {
                  setPage(params.page);
                }}
                Footer={{
                  color: "whitesmoke",
                }}
                pageSize={5}
                pagination
                getRowId={(row) => row.id}
                columns={[
                  { field: "date", headerName: "Date", width: 150 },
                  { field: "starttime", headerName: "StartTime", width: 200 },
                  {
                    field: "endtime",
                    headerName: "EndTime",
                    width: 120,
                  },
                  {
                    field: "seatnumber",
                    headerName: "Allotted Seat",
                    width: 150,
                  },
                  { field: "name", headerName: "StudentName", width: 130 },
                ]}
                rows={requests}
                components={{
                  Toolbar: ExportToolbar,
                }}
              />
            </div>

            {noTrans ? <No_Transactions /> : null}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Allotment;
