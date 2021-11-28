const express = require("express");
const myControllers = require("../controllers/usersController");
const router = express.Router();
const myverifyAuth = require("../middlewares/verifyAuth");

//Routes
router.post("/signup", myControllers.createUser);
router.post("/admin", myControllers.signinUser);
router.post("/faculty", myControllers.signinUser);
router.post("/student", myControllers.signinUser);
router.post("/forgot-password", myControllers.forgotPassword);
// router.put("/reset-password/:resetlink", myControllers.resetPassword);
router.post(
  "/addpreference",
  myverifyAuth.verifyToken,
  myControllers.AddPreference
);
router.get(
  "/student/dashboard/:user_id",
  myverifyAuth.verifyToken,
  myControllers.getAllPreference
);
router.get(
  "/admin/dashboard/:classname",
  myverifyAuth.verifyToken,
  myControllers.getAllSeats
);
router.delete(
  "/student/dashboard",
  myverifyAuth.verifyToken,
  myControllers.deletePreference
);

module.exports = router;
