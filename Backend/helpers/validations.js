const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

//Compare Password
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

//Email Check
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

//Password Validation
const validatePassword = (password) => {
  if (password.length <= 7 || password === "") {
    return false;
  }
  return true;
};

//Empty Check
const empty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
  return false;
};

//Generate a Token While SignIn
const generateUserTokenSignIn = (email, user_id,classname,name) => {
  console.log("email Sign In", email);
  const token = jwt.sign(
    {
      email,
      user_id,
      classname,
      name
    },
    "secret",
    { expiresIn: "3d" }
  );
  return token;
};

const generateUserTokenForgotPassword = (email, user_id) => {
  console.log("email--->", email);
  console.log("user_id--->", user_id);
  const token = jwt.sign(
    {
      email,
      user_id,
    },
    "23!@#(0)))}]]]11';./,`~+=-_",
    { expiresIn: "20m" }
  );
  return token;
};

//Mobile Number Check
const isValidMobile = (mobile) => {
  if (mobile.length <= 9 || mobile === "") {
    return false;
  }
  return true;
};

module.exports = {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  generateUserTokenSignIn,
  generateUserTokenForgotPassword,
  empty,
  isValidMobile,
};
