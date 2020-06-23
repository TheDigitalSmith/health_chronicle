const mongoose = require("mongoose");
const { diseaseSchema } = require("../Diseases");
const { medicineSchema } = require("../Medicines");
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
  diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: "disease" }],
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "medicine" }],
});

userSchema.plugin(plm);

const User = mongoose.model("user", userSchema);

module.exports = User;
