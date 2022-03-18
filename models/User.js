const { object } = require("joi");
const mongoose = require("mongoose");
const logger = require("../Scripts/Logger/user_logger.js");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.once("save", (next, doc) => {
  console.log(doc);
  next();
});

UserSchema.post("save", (doc) => {
  console.log(doc);
  logger.log({
    level: "info",
    message: doc,
  });
});

module.exports = mongoose.model("user", UserSchema);
