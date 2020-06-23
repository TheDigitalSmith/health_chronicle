const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: String,
});

const Disease = mongoose.model("disease", diseaseSchema);

module.exports = { Disease, diseaseSchema };
