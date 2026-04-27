const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  user: String,
  event: String,
  time: String
});

module.exports = mongoose.model("Registration", regSchema);