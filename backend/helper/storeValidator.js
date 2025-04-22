const { check } = require("express-validator");

const storeFieldValidator = [
  check("name", "Name Field is required!").not().isEmpty(),
  check("location", "Location Field is required!").not().isEmpty(),
  check("manager", "Manager Field is required!").not().isEmpty(),
];

module.exports = {
  storeFieldValidator,
};
