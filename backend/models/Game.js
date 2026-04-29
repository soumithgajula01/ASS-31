// models/Game.js
const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: String,

  // One-to-Many → Player → Games
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

module.exports = mongoose.model("Game", GameSchema);