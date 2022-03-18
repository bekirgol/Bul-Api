const jwt = require("jsonwebtoken");
require("dotenv").config();

const authendicateToken = (req, res, next) => {
  const token =
    req.headers["x-acces-token"] || req.body.token || req.query.token;

  if (!token) return res.status(500).send("No Token Provided");

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(500).send("failed to authendicate token ");
    req.user = user;
    next();
  });
};

module.exports = authendicateToken;
