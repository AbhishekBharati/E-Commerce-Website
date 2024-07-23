const express = require("express");
require("dotenv").config();
const authRouter = require("./routes/authRoutes")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Port is running at ${port}`)
})
