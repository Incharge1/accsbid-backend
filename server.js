const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------
//  MongoDB Connection
// ---------------------
const MONGO_URI = "mongodb+srv://Incharge1:Efootball@cluster0.ai7ck5p.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ---------------------
//  Test Route
// ---------------------
app.get("/test-db", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("MongoDB connection successful");
  } else {
    res.send("MongoDB NOT connected");
  }
});

// ---------------------
//  Root Route
// ---------------------
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ---------------------
//  Start Server
// ---------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
