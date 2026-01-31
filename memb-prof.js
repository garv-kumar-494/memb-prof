const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Atlas direct connection (NO ENV)
mongoose.connect(
  "mongodb+srv://GarvKumar:GarvKumarServer@cluster0.ptxxm7y.mongodb.net/memberDB"
)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  temple: String
});

const Member = mongoose.model("Member", memberSchema);

// API
app.post("/save", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.json({ message: "Data saved successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data ❌" });
  }
});

// signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ email, password });
  await newUser.save();

  res.json({ message: "Signup successful" });
});


// Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});  