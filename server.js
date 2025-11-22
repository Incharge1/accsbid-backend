// ===== IMPORTS =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// ===== APP SETUP =====
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== MONGODB CONNECTION =====
const MONGO_URI = "mongodb+srv://Incharge1:Efootball@cluster0.ai7ck5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.error("MongoDB Error ❌", err));

// ===== USER SCHEMA =====
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// ===== ROUTES =====

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ===== START SERVER =====
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✔`));
