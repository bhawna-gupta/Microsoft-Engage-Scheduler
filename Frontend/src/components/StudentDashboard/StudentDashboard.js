import React from "react";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Backdrop,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Link, useHistory, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import PreferenceItem from "./card/card";
import UserProfile from "../UserProfile";
import axios from "axios";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StudentDashboard = (props) => {
  const classes = useStyles();
  const user_id = UserProfile.getId();
  const name = UserProfile.getName();
  const token = UserProfile.getToken();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();
  const [preferences, setPreferences] = useState([]);
  const [mode_filter, setFilter] = useState("all");
  const [modeExist, setModeExist] = useState(false);

  const menuItems = [
    {
      text: "Roster",
      path: "/roster",
    },
    {
      text: "Logout",
      path: "/",
    },
  ];
  const re = {
    all: /[^]*/,
    maestro:
      /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/student/dashboard/${user_id}`, {
        headers: { token: `${token}` },
      })

      .then((response) => response.data)
      .then((preferenceData) => {
        setPreferences(preferenceData.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    UserProfile.logout();
    history.push("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const SetFilter = (text) => {
    var choice = text.toLowerCase();
    setModeExist(false);
    setFilter(choice);
  };

  const ToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const NavBar = () => (
    <Drawer open={openDrawer} onClose={ToggleDrawer} anchor="left">
      <div
        className={classes.drawer}
        role="presentation"
        onClick={ToggleDrawer}
        onKeyDown={ToggleDrawer}
      >
        <h2>Student</h2>
        <hr />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
            >
              <ListItemText primary={item.text} />
              <Divider />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );

  const PreferencesGrid = (props) => (
    <>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={2}
      >
        {preferences.map((card) => {
          if (re[props.filter].test(card.preference)) {
            setModeExist(true);
            return (
              <Grid
                className={classes.card_item}
                item
                key={card.user_id}
                xs={12}
                sm={3}
              >
                <PreferenceItem choice={card} />
              </Grid>
            );
          }
        })}
      </Grid>
      {modeExist ? "" : <NoCard />}
    </>
  );

  const NoCard = () => (
    <>
      <div className={classes.nocard_div}>
        <h2>You have not yet set preferences</h2>
        <Link style={{ textDecoration: "none" }} to="/addPreference">
          <Button
            style={{ backgroundColor: "#8899a6" }}
            variant="contained"
            size="large"
          >
            Set Preference
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Student Dashboard</title>
      </Helmet>
      <div className={classes.main}>
        <HideOnScroll {...props}>
          <AppBar className={classes.appBar} position="fixed" color="inherit">
            <Toolbar>
              <MenuIcon className={classes.menuicon} onClick={ToggleDrawer} />
              <h2 className={classes.heading} align="center">
                Welcome {name} !
              </h2>
              <Link style={{ textDecoration: "none" }} to="/addPreference">
                <Button
                  className={classes.addButton}
                  variant="contained"
                  size="small"
                >
                  Set Preference
                </Button>
              </Link>
              <Button
                className={classes.logoutButton}
                variant="contained"
                size="small"
                style={{ marginLeft: "10px" }}
                onClick={handleToggle}
              >
                Logout
              </Button>
              <Backdrop
                open={open}
                onClick={handleClose}
                style={{ textAlign: "center" }}
              >
                <Container className={classes.backdrop_container}>
                  <h3 className={classes.backdrop_text}>
                    Are you sure you want to logout?
                  </h3>
                  <br></br>
                  <div className={classes.backdrop_buttons}>
                    <Button
                      onClick={handleLogout}
                      variant="contained"
                      color="primary"
                    >
                      Logout
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </Container>
              </Backdrop>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <NavBar />
        {preferences.length > 0 ? (
          <PreferencesGrid filter={mode_filter} />
        ) : (
          <NoCard />
        )}
      </div>
    </>
  );
};

export default withRouter(StudentDashboard);
