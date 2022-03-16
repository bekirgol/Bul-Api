const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  lastName: String,
  mail: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
});

module.exports = mongoose.model("user", UserSchema);
