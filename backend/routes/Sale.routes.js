const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSale,
  getSaleList,
  createSale,
  updateSale,
  deleteSale,
} = require("../controller/Sale.controller");
const { saleFieldValidator } = require("../helper/saleValidator");
const validateId = require("../middlewares/validateId.middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getSaleList)
  .post(authMiddleware, saleFieldValidator, createSale);

router
  .route("/:id")
  .get(authMiddleware, validateId, getSale)
  .patch(authMiddleware, validateId, saleFieldValidator, updateSale)
  .delete(authMiddleware, validateId, deleteSale);

module.exports = router;
