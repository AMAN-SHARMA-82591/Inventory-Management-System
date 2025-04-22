const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getStore,
  getStoreList,
  createStore,
  updateStore,
  deleteStore,
} = require("../controller/Store.controller");
const { storeFieldValidator } = require("../helper/storeValidator");
const validateId = require("../middlewares/validateId.middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getStoreList)
  .post(authMiddleware, storeFieldValidator, createStore);

router
  .route("/:id")
  .get(authMiddleware, validateId, getStore)
  .patch(authMiddleware, validateId, storeFieldValidator, updateStore)
  .delete(authMiddleware, validateId, deleteStore);

module.exports = router;
