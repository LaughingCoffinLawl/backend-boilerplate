const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true, maxLength: 1000 },
  author: { type: String, required: true },
  date: { type: Date },
});

module.exports = mongoose.model("Message", messageSchema);
