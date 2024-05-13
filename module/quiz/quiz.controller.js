const QuizRouter = require("express").Router();
const { TokenChecker } = require("../Middleware/Authentication.middleware.js");
const { QuizManagingSheild } = require("../Middleware/Quiz.middleware.js");
// Importing models
const QuizModel = require("./Quiz.model.js");

QuizRouter.get("/", TokenChecker, (req, res, next) => {
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

QuizRouter.get("/:quizId", TokenChecker, (req, res, next) => {
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

QuizRouter.post("/create", QuizManagingSheild, async (req, res, next) => {
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

module.exports = QuizRouter;
