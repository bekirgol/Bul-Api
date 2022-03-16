const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.headers["x-acces-token"] || req.body.token || req.query.token;

  if (!token) {
    res.json({
      status: false,
      message: "No token provided.",
    });
  } else {
    jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: "Failed to authendicate token.",
        });
      } else {
        req.decode = decoded;
        next();
      }
    });
  }
};
