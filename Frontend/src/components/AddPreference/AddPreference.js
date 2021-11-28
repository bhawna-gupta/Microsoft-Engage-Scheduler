import { Helmet } from "react-helmet";
import { useState } from "react";
import useStyles from "./styles";
import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  Grid,
  Box,
  InputLabel,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import UserProfile from "../UserProfile";

const AddPreference = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-11-01")
  );
  const [selectedStartTime, setSelectedStartTime] = React.useState(
    new Date("2021-11-01T00:00:00").getTime()
  );
  const [selectedEndTime, setSelectedEndTime] = React.useState(
    new Date("2021-11-01T00:00:00").getTime()
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStartTimeChange = (starttime) => {
    setSelectedStartTime(starttime);
  };
  const handleEndTimeChange = (endtime) => {
    setSelectedEndTime(endtime);
  };
  const classes = useStyles();
  const user_id = UserProfile.getId();
  const token = UserProfile.getToken();
  const name = UserProfile.getName();

  const [category, setCategory] = useState("offline");
  const [duplicate, setDuplicate] = useState(false);
  const [open, setOpen] = useState(false);

  const Duplicate = () => (
    <div>
      <Alert style={{ width: "60%", margin: "10px auto" }} severity="error">
        Account with given Email/Mobile already exists
      </Alert>
    </div>
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const userObject = {
      name: name,
      user_id: user_id,
      date: selectedDate,
      starttime: selectedStartTime,
      endtime: selectedEndTime,
      preference: category,
    };

    await axios({
      method: "POST",
      url: `http://localhost:8081/addpreference`,
      headers: {
        token: `${token}`,
      },
      data: userObject,
    })
      .then((res) => {
        if (res.status == 200) {
          setOpen(true);
        }
      })
      .catch((error) => {
        if (error.response.status == 409) {
          setDuplicate(true);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Add Preference</title>
      </Helmet>
      <div className={classes.main}>
        <div className={classes.paper_container}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PeopleAltIcon className={classes.icon} />
            </Avatar>
            <form onSubmit={onSubmit} className={classes.form}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  direction="column"
                  alignItems="center"
                  container
                  justify="center"
                >
                  <KeyboardDatePicker
                    variant="dialog"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker"
                    label="Pick Your Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  ></KeyboardDatePicker>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Pick Your Start Time"
                    value={selectedStartTime}
                    onChange={handleStartTimeChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  ></KeyboardTimePicker>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Pick Your End Time"
                    value={selectedEndTime}
                    onChange={handleEndTimeChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  ></KeyboardTimePicker>
                </Grid>
              </MuiPickersUtilsProvider>
              <br></br>
              <FormControl>
                <FormLabel>Select Your Preference</FormLabel>
                <RadioGroup
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="online"
                  ></FormControlLabel>
                  <FormControlLabel
                    value="offline"
                    control={<Radio />}
                    label="offline"
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
              <Button
                className={classes.submitbutton}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </form>
            <div className={classes.backbutton}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/student/dashboard"
              >
                <br></br>
                <Button variant="contained" size="small">
                  Back
                </Button>
              </Link>
            </div>
            <br></br>
            <Success open={open} />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default AddPreference;
