const { check } = require("express-validator");

const productFieldValidator = [
  check("name", "Name Field is required!").not().isEmpty(),
  check("price", "Price must be a positive number!")
    .not()
    .isEmpty()
    .withMessage("Price File is required!")
    .isFloat({ gt: 0 }),
  check("quantity", "Quantity must be a positive number!")
    .optional()
    .isInt({ gt: 0 }),
  check("category_id", "Category ID must be a valid number or null!")
    .optional()
    .custom((value) => {
      if (value === null) return true;
      if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
        throw new Error("Category ID must be a valid ID or null!");
      }
      return true;
    }),
  check("supplier_id", "Supplier ID must be a valid number or null!")
    .optional()
    .custom((value) => {
      if (value === null) return true;
      if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
        throw new Error("Supplier ID must be a valid ID or null!");
      }
      return true;
    }),
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
