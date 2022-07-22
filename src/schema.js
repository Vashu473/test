const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  passward: String,
  number: Number,
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
