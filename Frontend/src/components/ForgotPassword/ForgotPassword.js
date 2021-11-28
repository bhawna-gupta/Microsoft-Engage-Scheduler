import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import useStyles from "./styles";
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

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  // const [phone, setPhone] = useState("");
  // const [pass, setPass] = useState("");
  // const [repass, setRepass] = useState("");
  const [errEmail, setErremail] = useState(false);
  // const [errPhone, setErrphone] = useState(false);
  // const [errPassMatch, setErrpassmatch] = useState(false);
  // const [errPass, setErrpass] = useState(false);
  const [absence, setAbsence] = useState(false);
  // const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);

  const EmailErr = () => (
    <div>
      <Alert style={{ width: "100%", margin: "10px auto" }} severity="error">
        Please enter valid Email
      </Alert>
    </div>
  );
  // const EmailAbsenceErr = () => (
  //   <div>
  //     <Alert style={{ width: "100%", margin: "10px auto" }} severity="error">
  //       User does not exist , Contact Admin !
  //     </Alert>
  //   </div>
  // );

  // const PhoneErr = () => (
  //     <div >
  //       <Alert style={{width:'90%',margin:'10px auto'}} severity="error">Please enter valid phone number</Alert>
  //     </div>
  //   )

  // const PassMatchErr = () => (
  //   <div>
  //     <Alert style={{ width: "70%", margin: "10px auto" }} severity="error">
  //       Passwords do not match
  //     </Alert>
  //   </div>
  // );

  // const PassErr = () => (
  //   <div>
  //     <Alert style={{ width: "90%", margin: "10px auto" }} severity="error">
  //       Must be minimum 8 characters long
  //     </Alert>
  //   </div>
  // );

  const Absence = () => (
    <div>
      <Alert style={{ width: "100%", margin: "10px auto" }} severity="error">
        User does not exist , Contact Admin !
      </Alert>
    </div>
  );

  const Success = () => (
    <Dialog className={classes.dialog} open={open}>
      <DialogTitle>
        <CheckCircleOutlineIcon style={{ color: "green", fontSize: "100px" }} />{" "}
        <br />
        Email has been sent , Please reset your password!
      </DialogTitle>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Button style={{ width: "100%" }} variant="contained" color="primary">
          Ok
        </Button>
      </Link>
    </Dialog>
  );

  // const togglePasswordVisiblity = () => {
  //   setPasswordShown(passwordShown ? false : true);
  // };

  const validate = () => {
    let valid = true;
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setErremail(true);
      valid = false;
    }
    // if (!(/^\d{10}$/.test(phone))){
    //     setErrphone(true);
    //     valid = false;
    // }
    // if (pass != repass) {
    //   setErrpassmatch(true);
    //   valid = false;
    // }
    // if (pass.length < 8) {
    //   setErrpass(true);
    //   valid = false;
    // }

    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErremail(false);
    // setErrphone(false);
    // setErrpass(false);
    // setErrpassmatch(false);
    if (validate()) {
      const userObject = {
        email: email,
      };

      await axios({
        method: "POST",
        url: `http://localhost:8081/forgot-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: userObject,
      })
        .then((res) => {
          if (res.status == 200) {
            setAbsence(false);
            setOpen(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setAbsence(true);
          }
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className={classes.main}>
        <div className={classes.paper_container}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PeopleAltIcon className={classes.icon} />
            </Avatar>
            <form onSubmit={onSubmit} className={classes.form}>
              <div className={classes.input}>
                <InputLabel htmlFor="email" className={classes.labels}>
                  Enter Your Email
                </InputLabel>

                <TextField
                  className={classes.fields}
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  size="small"
                  required
                />

                {errEmail ? <EmailErr /> : null}
              </div>
              {absence ? <Absence /> : null}{" "}
              <div className={classes.submitbuttondiv}>
                <Button
                  className={classes.submitbutton}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </form>
            <div className={classes.backbutton}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                <Button variant="contained" size="small">
                  Back
                </Button>
              </Link>
            </div>
            <Success open={open} />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
