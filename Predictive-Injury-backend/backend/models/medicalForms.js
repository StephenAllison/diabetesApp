const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalFormsSchema = new Schema({
  sport: String,
  league: String,
  team: String,
  name: String,
  position: String,
  physicalMediatingFactorScore: Number,
  psychologicalMediatingFactorScore: Number,
  socialMediatingFactorScore: Number,
  physicalModeratingFactorScore: Number,
  psychologicalModeratingFactorScore: Number,
  socialModeratingFactorScore: Number
});

const MedicalForms = mongoose.model("MedicalForms", medicalFormsSchema);

module.exports = MedicalForms;
