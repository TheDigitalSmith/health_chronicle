const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const organSchema = new mongoose.Schema({
  name: String,
});

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  organs: [organSchema],
});

const Disease = mongoose.model("disease", diseaseSchema);

function validateDiseases(disease) {
  const schema = Joi.object({
    name: Joi.string().max(50),
  });

  return schema.validate(disease);
}

module.exports = { Disease, diseaseSchema, validateDiseases };
