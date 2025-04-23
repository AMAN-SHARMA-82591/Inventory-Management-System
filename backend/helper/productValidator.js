const { check } = require("express-validator");

const productFieldValidator = [
  check("name", "Name Field is required!").not().isEmpty(),
  check("price")
    .not()
    .isEmpty()
    .withMessage("Price Field is required!")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a valid number greater than 0!"),
  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Quantity must be a valid integer greater than or equal to 0!"
    ),
];

const productSupplierFieldValidator = [
  check("product_id", "Product ID is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .isInt({ gt: 0 })
    .withMessage("Product ID must be a positive integer!"),
  check(
    "supplier_id",
    "Supplier ID is required and must be a positive integer!"
  )
    .not()
    .isEmpty()
    .withMessage("Supplier ID is required!")
    .isInt({ gt: 0 })
    .withMessage("Supplier ID must be a positive integer!"),
];

module.exports = {
  productFieldValidator,
  productSupplierFieldValidator,
};
