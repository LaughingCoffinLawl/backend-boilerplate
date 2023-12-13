const mongoose = require("mongoose");

// Define user schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the user model from the schema
const User = mongoose.model("User", userSchema);

// Export to use in our application
module.exports = User;
