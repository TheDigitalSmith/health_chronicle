const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const plm = require("passport-local-mongoose");

const emergencySchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  mobile: {
    type: Number,
    max: 50,
    required: true,
  },
  country: {
    type: String,
  },
});

const historySchema = new mongoose.Schema({
  date: Date,
  case: String,
  description: String,
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, max: 50 },
  lastName: { type: String, max: 50 },
  email: { type: String, max: 50 },
  dateOfBirth: Date,
  sex: { type: String, enum: ["male", "female"] },
  height: { type: Number, max: 500 },
  weight: { type: Number, max: 500 },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  organDonour: {
    type: Boolean,
    default: false,
  },
  emergencyContacts: [emergencySchema],
  diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: "disease" }],
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "medicine" }],
  vaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: "vaccine" }],
  history: [historySchema],
});

userSchema.plugin(plm);

const User = mongoose.model("user", userSchema);

function userValidator(user) {
  const enumSex = ["male", "female"];
  const enumBloodType = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const schema = Joi.object({
    firstName: Joi.string().max(30),
    lastName: Joi.string().max(30),
    email: Joi.string().email(),
    dateOfBirth: Joi.date(),
    sex: Joi.string.valid(...enumSex),
    height: Joi.number().max(500),
    weight: Joi.number().max(500),
    bloodType: Joi.string.valid(...enumBloodType),
  });

  return schema.validate(user);
}

module.exports = { User, userValidator };
