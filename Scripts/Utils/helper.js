const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passwordToHash = (password) => {
  return cryptojs
    .HmacSHA1(password, "0c39d8468ed1095ef4747d3f32b61060c0c4bc7b")
    .toString();
};

const generateAccesToken = (user) => {
  return jwt.sign(user.toObject(), process.env.ACCES_TOKEN_SECRET_KEY, {
    expiresIn: "1w",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign(user.toObject(), process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = {
  passwordToHash,
  generateAccesToken,
  generateRefreshToken,
};
