const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const Grid = require("gridfs-stream");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection URI
const mongoURI =
  "mongodb+srv://tejas:MMs5hc2g3EKnUlNE@cluster0.dkfyse7.mongodb.net/";

// MongoDB Connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Collection name for images
});

// GridFS Storage Configuration
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.mimetype)) {
        return reject(new Error("Invalid file type"));
      }

      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: {
            name: req.body.name, // Store user name
            social: req.body.social, // Store social handle
          },
        };
        resolve(fileInfo);
      });
    });
  },
});

// Set file size limits (5MB in this case)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// User model
const FormData = require("./Model"); // Make sure this is correctly defined

// Upload route (for uploading images with user data)
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req);
  // Validate input fields
  if (!req.body.name || !req.body.social) {
    return res
      .status(400)
      .json({ error: "Name and social handle are required." });
  }

  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "File upload is required." });
  }

  // try {
  //   const { name, social } = req.body;
  //   const image = req.file.filename; // Save the filename of the uploaded image

  //   // Save user data, including the image filename
  //   const newUser = new FormData({
  //     name,
  //     social,
  //     image,
  //   });

  //   await newUser.save();
  //   res.status(201).json(newUser); // Return the created user
  // } catch (error) {
  //   console.error("Error saving form data:", error.message);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
});

// Route to fetch all user data
app.get("/users", async (req, res) => {
  try {
    const users = await FormData.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
