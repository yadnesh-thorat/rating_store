const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");

const isAdmin = (req, res, next) => {
  if (!req.user?.role || req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

router.get("/dashboard", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const stores = await pool.query("SELECT COUNT(*) FROM stores");
    const ratings = await pool.query("SELECT COUNT(*) FROM ratings");

    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stores", verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, u.name AS owner_name, u.email AS owner_email
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/create-user", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashed, address, role]
    );

    res.json({ message: "User created", user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
