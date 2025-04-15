const express = require("express");
const { getUsersList, getUser } = require("../controller/User.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateId = require("../middlewares/validateId.middleware");

const router = express.Router();

router.route("/").get(authMiddleware, getUsersList);
router.route("/:id").get(authMiddleware, validateId, getUser);

module.exports = router;
