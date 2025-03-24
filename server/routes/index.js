const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

// express router
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.send("SWIFTPAY API STATUS : ON");
});
router.use("/user", userRouter);
router.use("/account", accountRouter);

// export router
module.exports = router;
