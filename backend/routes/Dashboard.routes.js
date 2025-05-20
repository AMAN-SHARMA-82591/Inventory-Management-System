const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getDashboardData } = require("../controller/Dashboard.controller");
const router = express.Router();

router.route("/").get(authMiddleware, getDashboardData);

module.exports = router;
