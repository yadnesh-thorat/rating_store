import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api"; // 👈 use api instead of axios

function RatingsReport() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api
      .get("/admin/ratings") // 👈 correct admin endpoint
      .then((res) => setRatings(res.data))
      .catch((err) => console.error("❌ Error fetching ratings:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ margin: "20px", width: "100%" }}>
        <h3>⭐ Ratings Report</h3>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Store</th>
              <th>User</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r) => (
              <tr key={r.id}>
                <td>{r.store_name}</td>  {/* Store Name */}
                <td>{r.user_name}</td>   {/* User Name */}
                <td>{r.rating}</td>      {/* Rating Number */}
                <td>{r.review || "No review"}</td> {/* Review Text */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

export default RatingsReport;
