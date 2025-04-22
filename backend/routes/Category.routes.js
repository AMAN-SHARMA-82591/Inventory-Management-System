const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controller/Category.controller");
const { categoryFieldValidator } = require("../helper/categoryValidator");
const validateId = require("../middlewares/validateId.middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getCategoryList)
  .post(authMiddleware, categoryFieldValidator, createCategory);

router
  .route("/:id")
  .get(authMiddleware, validateId, getCategory)
  .patch(authMiddleware, validateId, categoryFieldValidator, updateCategory)
  .delete(authMiddleware, validateId, deleteCategory);

module.exports = router;
