const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const http_server = express();

// Enabling cors inside server
http_server.use(cors());

// Configure DOTENV
require("dotenv").config();

// Database configuration
require("./Database/db.js");

// Configure body parser
http_server.use(parser.json());

// Register all api routes
http_server.use("/api/quiz", require("./module/quiz/quiz.controller.js"));
http_server.use(
  "/api/auth",
  require("./module/Authentication/user.controller.js")
);

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

http_server.listen(PORT, HOSTNAME, () => {
  console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});

http_server.get("/", (req, res) => {
  res.status(200).json({
    message: "Server started successfully",
  });
});
