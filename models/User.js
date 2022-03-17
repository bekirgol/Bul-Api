const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  lastName: {
    trim: true,
    type: String,
    minlength: 3,
    required: true,
  },
  mail: {
    trim: true,
    type: String,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
