const express = require("express");
const http_server = express();

const PORT = 5000;
const HOSTNAME = "localhost";

http_server.listen(PORT, HOSTNAME, () => {
  console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});

http_server.get("/", (req, res) => {
  res.status(200).json({
    message: "Server started successfully",
  });
});
