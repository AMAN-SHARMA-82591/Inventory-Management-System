const { check } = require("express-validator");

const supplierFieldValidator = [
  check("name", "Name Field is required!").not().isEmpty(),
  // check("price", "Price must be a positive number!")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Price File is required!")
  //   .isFloat({ gt: 0 }),
  // check("quantity", "Quantity must be a positive number!")
  //   .optional()
  //   .isInt({ gt: 0 }),
];

module.exports = {
  supplierFieldValidator,
};
