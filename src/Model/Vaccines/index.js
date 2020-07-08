const mongoose = require("mongoose");

const vaccineSchema = mongoose.Schema({
  name: { type: String, maxlength: 50 },
  manufacturer: { type: String, maxlength: 50 },
  medicineCode: String,
});

const Vaccine = mongoose.model("vaccine", vaccineSchema);

function validateVaccine(vaccine) {
  const schema = Joi.object({
    name: Joi.string().max(50),
    manufacturer: Joi.string().max(50),
    medicineCode: Joi.string(),
  });
  return schema.validate(vaccine);
}

module.exports = { Vaccine, validateVaccine };
