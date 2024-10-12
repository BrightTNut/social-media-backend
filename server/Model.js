const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  social: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("FormData", userSchema);
