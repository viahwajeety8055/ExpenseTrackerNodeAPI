const express = require("express");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config;

const errorHandlerMiddleware = require("./middleware/authMiddlerware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", authRouter);

// Add middleware to handle errors globally
app.use(errorHandlerMiddleware);

app.use("/", userRouter);

app.listen("5000", () => {
  console.log("Server is running on port 5000...");
});
