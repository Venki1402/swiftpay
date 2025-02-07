require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const connectDB = require("./models/db");

// express app
const app = express();

// db
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", rootRouter);

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
