const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  medicineCode: String,
});

const Medicine = mongoose.model("medicine", medicineSchema);

module.exports = { Medicine, medicineSchema };
