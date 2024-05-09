const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/superquizzer";

mongoose
  .connect(DB_URI)
  .then((response) => {
    console.log("DATABASE CONNECTION SUCCESSFUL");
  })
  .catch((error) => {
    console.log(error);
  });
