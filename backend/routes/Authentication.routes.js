const express = require("express");
const { register, login } = require("../controller/Authentication.controller");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../helper/userValidator");

const router = express.Router();

router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);

module.exports = router;
