const mongoose = require("mongoose");
const uploadCloud = require("../config/cloudinary");
const multer = require("multer");
const Schema = mongoose.Schema;

const athleteProfileSchema = new Schema({
  img: String,
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
  socialModeratingFactorScore: Number,
  injuryRiskScore: Number,
  riskLevel: String
});

const AthleteProfile = mongoose.model("AthleteProfile", athleteProfileSchema);

module.exports = AthleteProfile;
