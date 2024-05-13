var jwt = require("jsonwebtoken");

function QuizManagingSheild(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).json({
      message: "Login to continue",
      error: "Invalid token or Token missing",
    });
  }
  jwt.verify(
    req.headers.token,
    process.env.JWT_SECRET,
    function (error, decoded) {
      if (error) {
        return res.status(401).json({
          message: "Invalid or Expired token",
          error,
        });
      } else {
        if (decoded?.role.indexOf("admin") > -1) {
          next();
        } else {
          return res.status(401).json({
            message: "Unauthorized access",
            error,
          });
        }
      }
    }
  );
}

module.exports = {
  QuizManagingSheild,
};
