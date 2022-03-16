const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LostItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  imageUrl: String,
  userId: mongoose.SchemaTypes.ObjectId,
  category: {
    type: String,
  },
});

module.exports = mongoose.model("lostGoods", LostItemSchema);
