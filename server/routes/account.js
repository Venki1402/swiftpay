const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getBalance, transfer } = require("../controllers/accountController");
const router = express.Router();

// routes
router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transfer);

module.exports = router;
