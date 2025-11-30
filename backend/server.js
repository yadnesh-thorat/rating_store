const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// Import routes and database
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");
const adminRoutes = require("./routes/admin"); // ⬅️ NEW (Admin API)
const pool = require("./db");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/admin", adminRoutes); // ⬅️ Register admin routes

// Test database route
app.get("/db-test", async (req, res) => {
  console.log("DB Test route hit...");
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "DB connection failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
