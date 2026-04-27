const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ moved to top

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // ✅ moved here, after middleware

// ✅ Direct local MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sportsDB", {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}

connectDB();

// ── Models ──
const User         = require("./models/user");
const Registration = require("./models/Registration");

// Simple test route
app.get("/", (req, res) => {
  res.send("Server working with MongoDB");
});

// ── LOGIN ──
app.post("/login", async (req, res) => {
  const { roll, password } = req.body;
  const user = await User.findOne({ roll, password });
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ── REGISTER FOR EVENT ──
app.post("/register", async (req, res) => {
  const { user, event } = req.body;
  const exists = await Registration.findOne({ user, event });
  if (exists) {
    return res.json({ success: false, message: "Already registered for this event" });
  }
  const newReg = new Registration({
    user,
    event,
    time: new Date().toLocaleString()
  });
  await newReg.save();
  res.json({ success: true });
});

// ── GET MY REGISTRATIONS ──
app.get("/my-registrations/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const data = await Registration.find({ user });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── START SERVER ──
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});