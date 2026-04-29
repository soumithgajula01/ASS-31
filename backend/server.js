const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/players", require("./routes/playerRoutes"));
app.use("/games", require("./routes/gameRoutes"));
app.use("/teams", require("./routes/teamRoutes"));

// ✅ FIXED CONNECTION
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gamingDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));