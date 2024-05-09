const express = require("express");
const parser = require("body-parser");
const http_server = express();

// Importing models
const QuizModel = require("./models/Quiz.model.js");

// Configure DOTENV
require("dotenv").config();

// Database configuration
require("./Database/db.js");

// Configure body parser
http_server.use(parser.json());

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

http_server.get("/quizzes", (req, res, next) => {
  QuizModel.find()
    .then((response) => {
      res.status(200).json({
        message: "Quiz fetched successfully",
        length: response.length,
        page: 1,
        data: response,
      });
    })
    .catch((error) => console.log(error));
});

http_server.get("/quizzes/:quizId", (req, res, next) => {
  const { quizId } = req.params;
  QuizModel.findOne({ _id: quizId })
    .then((response) => {
      res.status(200).json({
        message: "Quiz fetched successfully",
        data: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
        message: "Something went wrong",
      });
    });
});

http_server.post("/create/quiz", async (req, res, next) => {
  // try {
  //   const Quiz = new QuizModel(req.body);
  //   const response = await Quiz.save();
  //   if (response._id) {
  //     return res.status(201).json({
  //       message: "Quiz created",
  //       data: response,
  //     });
  //   }
  // } catch (error) {
  //   return res.status(400).json({
  //     error: error.message,
  //     message: "Something went wrong",
  //   });
  // }
  const Quiz = new QuizModel(req.body);
  Quiz.save()
    .then((response) => {
      if (response._id) {
        return res.status(201).json({
          message: "Quiz created successfully",
          data: response,
        });
      } else {
        return res.status(500).json({
          message: "Quiz creation failed",
          data: response,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return res
          .status(400)
          .json({ error: error.message, message: "Something went wrong" });
      }
    });
});
