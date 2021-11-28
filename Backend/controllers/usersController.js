const _ = require("lodash");
const pool = require("../db/pool");
var moment = require("moment");
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxe5f647716ca54784bb8e5cbbf8db7173.mailgun.org";
const mg = mailgun({
  apiKey: "54fcbed10d7378c4e68575a686e959eb-7dcc6512-6089f630",
  domain: DOMAIN,
});
let {
  comparePassword,
  isValidEmail,
  isValidMobile,
  hashPassword,
  validatePassword,
  generateUserTokenSignIn,
  generateUserTokenForgotPassword,
  empty,
} = require("../helpers/validations");
let { errorMessage, successMessage, status } = require("../helpers/status");
let {
  deletePreferenceQuery,
  UpdatePreferenceQuery,
  UpdateResetLinkQuery,
  createUserQuery,
  signinUserQuery,
  InsertPreferenceQuery,
  getAllPreferenceQuery,
  getOfflineCountQuery,
  FetchPreferenceQuery,
  UpdateseatnumberQuery,
  AcceptStatusQuery,
  RejectStatusQuery,
  getfinalDataQuery,
} = require("../db/query");
const { JsonWebTokenError } = require("jsonwebtoken");

//Create a User
const createUser = async (req, res) => {
  const { name, email, password, mobile, classname } = req.body;
  if (
    empty(email) ||
    empty(name) ||
    empty(mobile) ||
    empty(password) ||
    empty(classname)
  ) {
    errorMessage.error =
      "Email, Password, Name ,Mobile and ClassName cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid Email";
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than seven(7) characters";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidMobile(mobile)) {
    errorMessage.error = "Mobile number must be of 10 digits";
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(password);
  const values = [name, email, mobile, hashedPassword, classname];
  try {
    const { rows } = await pool.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    return res.sendStatus(status.created);
  } catch (error) {
    if (error.routine === "_bt_check_unique") {
      errorMessage.error = "User with that EMAIL/MOBILE already exist";
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

//Signin a User
const signinUser = async (req, res) => {
  const { email, password } = req.body;
  if (empty(email) || empty(password)) {
    errorMessage.error = "Email or Password detail is missing";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = "Please enter a valid Email or Password";
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const { rows } = await pool.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "User with this email does not exist";
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = "The password you provided is incorrect";
      return res.status(status.bad).send(errorMessage);
    }
    const token = generateUserTokenSignIn(
      dbResponse.email,
      dbResponse.user_id,
      dbResponse.classname,
      dbResponse.name
    );
    delete dbResponse.password;
    delete dbResponse.email;
    delete dbResponse.mobile;
    delete dbResponse.reset_email;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (empty(email)) {
    errorMessage.error = "Email is missing";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid Email";
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const { rows } = await pool.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "User with this email does not exist";
      return res.status(status.notfound).send(errorMessage);
    }
    const token = generateUserTokenForgotPassword(
      dbResponse.email,
      dbResponse.user_id
    );
    username = dbResponse.name;
    useremail = dbResponse.email;
    delete dbResponse.name;
    delete dbResponse.password;
    delete dbResponse.email;
    delete dbResponse.mobile;
    delete dbResponse.resetlink;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    const rows_ = await pool.query(UpdateResetLinkQuery, [
      token,
      dbResponse.user_id,
    ]);
    const data = {
      from: "noreply@university.com",
      to: email,
      subject: "Reset Password Link",
      html: `
      <p>Hi ${username},</p>
      <p>We have received your password reset request.</p>
      <p>Username: ${useremail}</p>        
      <p>Please click on given link to reset your password</p>
      <p>http://localhost:5000/reset-password/${token}</p>
        `,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({
          message: "Email has not been sent",
        });
      }
      return res.status(status.success).send(successMessage);
    });
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};
//ResetPassword
const resetPassword = async (req, res) => {
  const { newPass } = req.body;
  const { resetlink } = req.params;
  const decoded = jwt.verify(resetlink, "23!@#(0)))}]]]11';./,`~+=-_");
  if (!decoded) {
    return res.status(status.unauthorized).json({
      error: "Incorrect token or it is expired!!",
    });
  }
  newPass = hashPassword(newPass);
  const { rows } = await pool.query(
    `Update users set password =$1 where resetlink=$2`,
    [newPass, resetlink]
  );
  return res.status(status.success);
};
//Add preference
const AddPreference = async (req, res) => {
  let { date, starttime, endtime, preference } = req.body;
  const { user_id, classname } = req.user;
  if (empty(date) || empty(starttime) || empty(endtime) || empty(preference)) {
    errorMessage.error = "Any field cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  const { rows } = await pool.query(`SELECT name from users where user_id=$1`, [
    user_id,
  ]);
  var momentDate = moment(date).format("DD/MM/YYYY");
  var momentStartTime = moment(starttime).format("HH:mm");
  var momentEndTime = moment(endtime).format("HH:mm");
  const values = [
    rows[0].name,
    classname,
    momentDate,
    momentStartTime,
    momentEndTime,
    preference,
    user_id,
  ];

  try {
    const { rows } = await pool.query(InsertPreferenceQuery, values);
    const dbResponse = rows[0];
    return res.sendStatus(status.success);
  } catch (error) {
    // if (error.routine === "_bt_check_unique") {
    //   errorMessage.error = "User with that EMAIL/MOBILE already exist";
    //   return res.status(status.conflict).send(errorMessage);
    // }
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};
//Get All Preference
const getAllPreference = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query(getAllPreferenceQuery, [user_id]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "You have not set your preference";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage.error);
  }
};

// Get all seats
const getAllSeats = async (req, res) => {
  const { classname } = req.params;
  try {
    const { rows } = await pool.query(getOfflineCountQuery, [classname]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "You have not set your preference";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    record = 0;
    for (; record < dbResponse.length; record++) {
      seatcount = 1;
      offline_count = dbResponse[record]["count"];
      requiredDate = dbResponse[record]["date"];
      requiredTime = dbResponse[record]["starttime"];
      if (offline_count <= 25) {
        const { rows } = await pool.query(FetchPreferenceQuery, [
          requiredDate,
          requiredTime,
        ]);
        modifydbResponse = rows;
        counter = 0;
        for (; counter < modifydbResponse.length; counter++) {
          if (seatcount <= 50) {
            const { rows } = await pool.query(UpdatePreferenceQuery, [
              modifydbResponse[counter]["user_id"],
              modifydbResponse[counter]["date"],
              modifydbResponse[counter]["starttime"],
            ]);
            if (!rows.length) {
              continue;
            }
            const responseFetched = await pool.query(UpdateseatnumberQuery, [
              seatcount,
              modifydbResponse[counter]["user_id"],
              modifydbResponse[counter]["date"],
              modifydbResponse[counter]["starttime"],
            ]);
            seatcount += 2;
          }
        }
      }
      const rejectResponse = await pool.query(RejectStatusQuery, [classname]);
      const acceptResponse = await pool.query(AcceptStatusQuery, [classname]);
    }
    const schedulerData = await pool.query(getfinalDataQuery, [classname]);
    successMessage.data = schedulerData.rows;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage.error);
  }
};

//Delete a Preference
const deletePreference = async (req, res) => {
  const { id } = req.body;
  try {
    const { rows } = await pool.query(deletePreferenceQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "preference with given id does not exist";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = "Preference deleted successfully";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};
module.exports = {
  createUser,
  signinUser,
  forgotPassword,
  AddPreference,
  getAllPreference,
  getAllSeats,
  deletePreference,
  
};
