const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  roll: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);