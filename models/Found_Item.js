const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoundItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: String,
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    category: {
      type: String,
    },
    city: String,
    district: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("foundItem", FoundItemSchema);
