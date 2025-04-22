const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getPurchase,
  getPurchaseList,
  createPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controller/Purchase.controller");
const { purchaseFieldValidator } = require("../helper/purchaseValidator");
const validateId = require("../middlewares/validateId.middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getPurchaseList)
  .post(authMiddleware, purchaseFieldValidator, createPurchase);

router
  .route("/:id")
  .get(authMiddleware, validateId, getPurchase)
  .patch(authMiddleware, validateId, purchaseFieldValidator, updatePurchase)
  .delete(authMiddleware, validateId, deletePurchase);

module.exports = router;
