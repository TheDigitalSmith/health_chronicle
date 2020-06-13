const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: Date,
  sex: String,
  height: Number,
  weight: Number,
  bloodType: String,
  emergencyContacts: String,
});

userSchema.plugin(plm);

const User = mongoose.model("user", userSchema);

module.exports = User;
