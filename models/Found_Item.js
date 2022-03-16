const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoundItemSchema = new Schema({
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
  userId: mongoose.SchemaTypes.ObjectId,
  category: {
    type: String,
  },
});

module.exports = mongoose.model("foundItem", FoundItemSchema);
