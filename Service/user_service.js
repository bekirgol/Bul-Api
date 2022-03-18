const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const hash = require("../Scripts/Utils/helper");

const addUser = (user_data) => {
  const user = new UserModel(user_data);
  return user.save();
};

const loginUser = (loginData) => {
  return UserModel.findOne(loginData);
};

module.exports = {
  addUser,
  loginUser,
};
