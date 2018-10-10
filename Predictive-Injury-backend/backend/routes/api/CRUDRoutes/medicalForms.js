// routes/project-routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const medicalForms = require("../../../models/medicalForms");

// GET route => to Get Full Medical Form Data
router.get("/medicalForms", (req, res, next) => {
  medicalForms
    .find()
    // .populate("moderators")
    // .populate("mediators")
    .then(fullMedicalFormData => {
      res.json(fullMedicalFormData);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST route => to create a new Athlete Medical Form
router.post("/createNewAthleteMedicalForm", (req, res, next) => {
  // if (req.user.role === "medstaff") {
  //   return res.redirect("/");
  // }

  medicalForms
    .create({
      sport: req.body.sport,
      league: req.body.league,
      team: req.body.team,
      name: req.body.name,
      position: req.body.position,
      physicalMediatingFactorScore: req.body.physicalMediatingFactorScore,
      psychologicalMediatingFactorScore:
        req.body.psychologicalMediatingFactorScore,
      socialMediatingFactorScore: req.body.socialMediatingFactorScore,
      physicalModeratingFactorScore: req.body.physicalModeratingFactorScore,
      psychologicalModeratingFactorScore:
        req.body.psychologicalModeratingFactorScore,
      socialModeratingFactorScore: req.body.socialModeratingFactorScore
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});
//GET route => Find Athlete By ID
router.get("/athleteMedicalForm/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  medicalForms
    .findById(req.params.id)
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
});
//PUT route => Update Athlete
router.put("/updatemedicalForms/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  medicalForms
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Profile ${req.params.id} has been updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});
//Delete route => Delete Athlete
router.delete("/deleteAthleteMedicalForm/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  medicalForms
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Athlete Medical Form with ${
          req.params.id
        } has been successfully removed.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
