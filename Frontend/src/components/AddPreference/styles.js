import { makeStyles } from "@material-ui/core/styles";
import BgImage from "../../assets/images/PreferenceImage.jpg";
export default makeStyles(() => ({
  main: {
    display: "block",
    height: "100vh",
    backgroundImage: `url(${BgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  paper: {
    width: "35vw",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    backgroundColor: "#F5F5F5",
  },

  carddiv: {
    marginTop: "15px",
  },

  form: {
    textAlign: "center",
  },

  fields: {
    color: "whitesmoke",
    "&.Mui-focused": {
      color: "whitesmoke",
    },
  },

  label: {
    fontSize: "1.3rem",
    color: "black",
    marginRight: "20px",
  },

  input: {
    margin: "20px 0",
  },

  buttondiv: {
    margin: "20px 0",
  },

  submitbutton: {
    marginTop: "10px",
    width: "70%",
    backgroundColor: "#A9A9A9",
    "&:hover": {
      backgroundColor: "#4a4ce2",
      filter: "brightness(90%)",
    },
  },

  dialog: {
    textAlign: "center",
  },
}));
