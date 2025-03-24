const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// routes
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put("/", authMiddleware, userController.updateUser);
router.get("/bulk", userController.getUsers);
router.get("/bulk/:filter", userController.getUsers);


module.exports = router;
