import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/MainPage.js";
import Admin from "./components/Admin/AdminPage.js";
import Faculty from "./components/Faculty/FacultyPage.js";
import Student from "./components/Student/StudentPage.js";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.js";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard.js";
import FacultyDashboard from "./components/FacultyDashboard/FacultyDashboard.js";
import resetPassword from "./components/ResetPassword/ResetPassword.js";

import Error from "./pages/ErrorPage.js";
import forgotPassword from "./components/ForgotPassword/ForgotPassword.js";

import Signup from "./components/signup/signup.js";
import AddPreference from "./components/AddPreference/AddPreference";
import Allotment from "./components/Allotment/allotment";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/faculty" component={Faculty} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/student/dashboard" component={StudentDashboard} />
        <Route exact path="/faculty/dashboard" component={FacultyDashboard} />
        <Route exact path="/allotment" component={Allotment} />
        <Route path="/addpreference" exact component={AddPreference} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={forgotPassword} />
        <Route path="/reset-password/:token" component={resetPassword} />
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
