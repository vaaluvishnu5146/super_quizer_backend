var jwt = require("jsonwebtoken");

function TokenChecker(req, res, next) {
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
        next();
      }
    }
  );
}

module.exports = {
  TokenChecker,
};
