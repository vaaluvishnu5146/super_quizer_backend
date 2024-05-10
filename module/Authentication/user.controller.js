const UserRouter = require("express").Router();
const UserModel = require("./user.model");

UserRouter.post("/create", (req, res) => {
  const User = new UserModel(req.body);
  User.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(201).json({
          message: "User creation successful",
          data: response,
        });
      } else {
        return res.status(500).json({
          message: "User creation failed",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
        message: "Something went wrong",
      });
    });
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is invalid",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is invalid",
    });
  }

  const matchingUser = await UserModel.findOne({ email });

  if (!matchingUser) {
    return res.status(404).json({
      message: "No User Found",
    });
  }

  if (matchingUser.password === password) {
    return res.status(200).json({
      message: "Login successful",
    });
  } else {
    return res.status(200).json({
      error: "Wrong credentials",
      message: "Login failed",
    });
  }
});

UserRouter.patch("/user/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      message: "User Id is invalid",
    });
  }

  UserModel.updateOne({ _id: userId }, req.body, { new: true })
    .then((response) => {
      if (response.modifiedCount === 1) {
        return res.status(200).json({
          message: "User is updated",
        });
      } else {
        return res.status(500).json({
          message: "User updation failed",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
        message: "Something bad happened",
      });
    });
});

module.exports = UserRouter;
