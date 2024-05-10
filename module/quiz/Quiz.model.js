const mongoose = require("mongoose");

// Create quiz schema
const QuizSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  testDuration: {
    type: Number,
    required: true,
  },
});

const QuizModel = mongoose.model("quizes", QuizSchema);

module.exports = QuizModel;
