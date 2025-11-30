import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function RateStore() {
  const { id } = useParams();
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in & is USER
    const token = localStorage.getItem("token");
    const role = (localStorage.getItem("role") || "").toUpperCase().trim();

    if (!token) {
      alert("Please login to rate.");
      navigate("/login");
      return;
    }

    if (role !== "USER") {
      alert("Only normal users can rate stores.");
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      await api.post(`/store/rate/${id}`, { rating: Number(rating) });
      alert("⭐ Rating submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Rating Error:", err.response?.data);
      alert(err.response?.data?.error || "Failed to submit rating");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Rate Store</h3>

      {/* Rating Dropdown */}
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={{ padding: "5px", marginRight: "10px" }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>

      <button onClick={handleSubmit} style={{ padding: "5px 10px" }}>
        Submit
      </button>
    </div>
  );
}

export default RateStore;
