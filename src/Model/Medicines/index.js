const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const medicineSchema = new mongoose.Schema({
  name: { type: String, maxlength: 50 },
  manufacturer: { type: String, maxlength: 50 },
  medicineCode: String,
});

const Medicine = mongoose.model("medicine", medicineSchema);

function validateMedicine(medicine) {
  const schema = Joi.object({
    name: Joi.string().max(50),
    manufacturer: Joi.string().max(50),
    medicineCode: Joi.string(),
  });
  return schema.validate(medicine);
}

module.exports = { Medicine, medicineSchema, validateMedicine };
