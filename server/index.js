const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://tejas:MMs5hc2g3EKnUlNE@cluster0.dkfyse7.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Model
const FormData = require("./Model");

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.post("/users", async (req, res) => {
  try {
    const { name, social } = req.body;

    // Check if student already exists
    const existing = await FormData.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        prompt: "USer already exist",
      });
    }

    // Create new student entry
    const newUser = new FormData({
      name,
      social,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving form data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  route to fetch all student data
app.get("/users", async (req, res) => {
  try {
    const users = await FormData.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
