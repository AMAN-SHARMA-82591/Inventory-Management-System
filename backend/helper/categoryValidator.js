const { check } = require("express-validator");

const categoryFieldValidator = [
  check("name", "Name Field is required!").not().isEmpty(),
//   check("description", "Description Field is required!").not().isEqual(),
];

module.exports = {
  categoryFieldValidator,
};
