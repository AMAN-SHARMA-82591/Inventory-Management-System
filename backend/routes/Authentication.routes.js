const express = require("express");
const {
  register,
  login,
  logout,
  loginWithGoogle,
} = require("../controller/Authentication.controller");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../helper/userValidator");

const router = express.Router();

router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);
router.post("/googleLogin", loginWithGoogle);
router.post("/logout", logout);

module.exports = router;
