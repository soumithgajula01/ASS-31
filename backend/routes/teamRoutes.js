const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// CREATE
router.post("/", async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
});

// READ
router.get("/", async (req, res) => {
  const teams = await Team.find().populate("players");
  res.json(teams);
});

module.exports = router;