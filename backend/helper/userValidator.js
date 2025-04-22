const { check } = require("express-validator");

const userRegisterValidator = [
  check("username", "Username Field is required!").not().isEmpty(),
  check("email", "Email Field is required!").not().isEmpty(),
  check("password", "Password Field is required!").not().isEmpty(),
];

const userLoginValidator = [
  check("email", "Email Field is required!").not().isEmpty(),
  check("password", "Password Field is required!").not().isEmpty(),
];

module.exports = {
  userLoginValidator,
  userRegisterValidator,
};
