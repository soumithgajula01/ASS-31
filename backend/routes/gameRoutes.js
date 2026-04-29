const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// CREATE
router.post("/", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.json(game);
});

// READ
router.get("/", async (req, res) => {
  const games = await Game.find().populate("player");
  res.json(games);
});

module.exports = router;