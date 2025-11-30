const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/authMiddleware");

// ------------------------ CREATE STORE ------------------------
router.post("/create", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "STORE_OWNER") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: "Store name and location are required" });
    }

    const result = await pool.query(
      "INSERT INTO stores (name, address, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [name, location, req.user.id]
    );

    res.status(201).json({ message: "Store created successfully", store: result.rows[0] });
  } catch (error) {
    console.error("Store creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ GET ALL STORES ------------------------
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stores");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ GET STORE BY ID ------------------------
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stores WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Store not found" });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Fetch store error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ UPDATE STORE ------------------------
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "STORE_OWNER") {
      return res.status(403).json({ error: "Only store owners can update their store" });
    }

    const { name, location } = req.body;
    if (!name || !location) return res.status(400).json({ error: "Both name and location required" });

    const storeCheck = await pool.query("SELECT * FROM stores WHERE id = $1", [req.params.id]);
    if (storeCheck.rows.length === 0) return res.status(404).json({ error: "Store not found" });

    if (storeCheck.rows[0].owner_id !== req.user.id)
      return res.status(403).json({ error: "You are not the owner of this store" });

    const updatedStore = await pool.query(
      "UPDATE stores SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [name, location, req.params.id]
    );

    res.status(200).json({ message: "Store updated successfully", store: updatedStore.rows[0] });
  } catch (error) {
    console.error("Update store error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ DELETE STORE ------------------------
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const store = await pool.query("SELECT * FROM stores WHERE id = $1", [req.params.id]);
    if (store.rows.length === 0) return res.status(404).json({ error: "Store not found" });

    // 🚨 Allow if admin OR the owner
    if (req.user.role !== "ADMIN" && store.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await pool.query("DELETE FROM stores WHERE id = $1", [req.params.id]);
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Delete store error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ RATE STORE (Improved) ------------------------
router.post("/rate/:storeId", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "USER") {
      return res.status(403).json({ error: "Only users can rate stores" });
    }

    const { rating } = req.body;
    const storeId = req.params.storeId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Check if store exists
    const store = await pool.query("SELECT * FROM stores WHERE id = $1", [storeId]);
    if (store.rows.length === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Check if user has already rated this store
    const existingRating = await pool.query(
      "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2",
      [req.user.id, storeId]
    );

    if (existingRating.rows.length > 0) {
      // If already rated → update
      await pool.query(
        "UPDATE ratings SET rating = $1, created_at = NOW() WHERE user_id = $2 AND store_id = $3",
        [rating, req.user.id, storeId]
      );
    } else {
      // If not rated → insert
      await pool.query(
        "INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3)",
        [req.user.id, storeId, rating]
      );
    }

    // Update the average rating
    const avgRatingResult = await pool.query(
      "SELECT AVG(rating) AS avg FROM ratings WHERE store_id = $1",
      [storeId]
    );

    const updatedStore = await pool.query(
      "UPDATE stores SET avg_rating = $1 WHERE id = $2 RETURNING *",
      [avgRatingResult.rows[0].avg, storeId]
    );

    res.status(200).json({
      message: "Rating submitted successfully",
      avg_rating: updatedStore.rows[0].avg_rating
    });
  } catch (error) {
    console.error("Rating error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
