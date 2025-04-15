const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSupplierList,
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controller/Supplier.controller");
const { supplierFieldValidator } = require("../helper/supplierValidator");
const validateId = require("../middlewares/validateId.middleware");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getSupplierList)
  .post(authMiddleware, supplierFieldValidator, createSupplier);
router
  .route("/:id")
  .get(authMiddleware, validateId, getSupplier)
  .patch(authMiddleware, validateId, supplierFieldValidator, updateSupplier)
  .delete(authMiddleware, validateId, deleteSupplier);

module.exports = router;
