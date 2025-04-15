const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getProductSupplierList,
  getProductSupplier,
  createProductSupplier,
  updateProductSupplier,
  deleteProductSupplier,
} = require("../controller/ProductSupplier.controller");
const { productSupplierFieldValidator } = require("../helper/productValidator");
const validateId = require("../middlewares/validateId.middleware");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getProductSupplierList)
  .post(authMiddleware, productSupplierFieldValidator, createProductSupplier);
router
  .route("/:id")
  .get(authMiddleware, validateId, getProductSupplier)
  .patch(
    authMiddleware,
    validateId,
    productSupplierFieldValidator,
    updateProductSupplier
  )
  .delete(authMiddleware, validateId, deleteProductSupplier);

module.exports = router;
