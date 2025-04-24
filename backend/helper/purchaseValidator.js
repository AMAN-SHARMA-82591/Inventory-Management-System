const { check } = require("express-validator");

const purchaseFieldValidator = [
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
  check(
    "supplier_id",
    "Supplier ID is required and must be a positive integer!"
  )
    .not()
    .isEmpty()
    .withMessage("Supplier ID is required!")
    .isInt({ gt: 0 })
    .withMessage("Supplier ID must be a positive integer!"),
  check("quantity", "Quantity is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Quantity is required!")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer!"),
  check("purchase_date", "Purchase Date is required and must be a valid date!")
    .not()
    .isEmpty()
    .withMessage("Purchase Date is required!")
    .isISO8601()
    .withMessage("Purchase Date must be a valid date in YYYY-MM-DD format!")
    .custom((value) => {
      const currentDate = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

      const salesDate = new Date(value);

      if (salesDate > currentDate) {
        throw new Error("Purchase Date cannot be in the future!");
      }
      if (salesDate < oneYearAgo) {
        throw new Error("Purchase Date cannot be older than 1 year!");
      }
      return true;
    }),
  check("total_cost", "Total Cost is required and must be a positive integer!")
    .not()
    .isEmpty()
    .withMessage("Total Cost is required!")
    .isFloat({ gt: 0 })
    .withMessage("Total Cost must be a positive integer!"),
];

module.exports = {
  purchaseFieldValidator,
};
