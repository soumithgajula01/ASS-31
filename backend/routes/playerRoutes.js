const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// CREATE
router.post("/", async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

// READ
router.get("/", async (req, res) => {
  const players = await Player.find().populate("teams");
  res.json(players);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;