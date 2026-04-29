// models/Player.js
const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  username: String,

  // Many-to-Many (Player ↔ Team)
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

module.exports = mongoose.model("Player", PlayerSchema);