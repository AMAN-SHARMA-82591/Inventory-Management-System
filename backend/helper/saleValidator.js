const { check } = require("express-validator");

const saleFieldValidator = [
  check("product_id", "Product ID is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .isInt({ gt: 0 })
    .withMessage("Product ID must be a positive integer!"),
  check("store_id", "Store ID is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Store ID is required!")
    .isInt({ gt: 0 })
    .withMessage("Store ID must be a positive integer!"),
  check("quantity", "Quantity is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Quantity is required!")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer!"),
  check("sales_date", "Sales Date is required and must be a valid date!")
    .not()
    .isEmpty()
    .withMessage("Sales Date is required!")
    .isISO8601()
    .withMessage("Sales Date must be a valid date in YYYY-MM-DD format!"),
  check(
    "total_amount",
    "Total Amount is required and must be a positive integer!"
  )
    .not()
    .isEmpty()
    .withMessage("Total Amount is required!")
    .isInt({ gt: 0 })
    .withMessage("Total Amount must be a positive integer!"),
];

module.exports = {
  saleFieldValidator,
};
