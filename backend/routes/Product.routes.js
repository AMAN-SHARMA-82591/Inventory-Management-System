const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getProductList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductInputList,
} = require("../controller/Product.controller");
const { productFieldValidator } = require("../helper/productValidator");
const validateId = require("../middlewares/validateId.middleware");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getProductList)
  .post(authMiddleware, productFieldValidator, createProduct);
router.get("/input", authMiddleware, getProductInputList);
router
  .route("/:id")
  .get(authMiddleware, validateId, getProduct)
  .patch(authMiddleware, validateId, productFieldValidator, updateProduct)
  .delete(authMiddleware, validateId, deleteProduct);

module.exports = router;
