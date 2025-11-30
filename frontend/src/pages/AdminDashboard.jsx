import React, { useEffect, useState } from "react";
import api from "../api";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const role = (localStorage.getItem("role") || "").toUpperCase().trim();
    if (role !== "ADMIN") return navigate("/login");

    api.get("/admin/dashboard")
      .then((res) => {
        setStats({
          totalUsers: res.data.totalUsers || 0,
          totalStores: res.data.totalStores || 0,
          totalRatings: res.data.totalRatings || 0,
        });
      })
      .catch((err) => {
        console.error("Error getting dashboard data:", err.response?.data);
        alert("Failed to load dashboard. Please re-login.");
        navigate("/login");
      });
  }, [navigate]);

 
  if (!stats) return <p style={{ padding: "20px" }}>Loading dashboard...</p>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ margin: "20px", width: "100%" }}>
        <h2>Welcome, Admin 👋</h2>
        <p>System overview:</p>

       
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {statCard("👤 Total Users", stats.totalUsers, "#2563eb")}
          {statCard("🏪 Total Stores", stats.totalStores, "#16a34a")}
          {statCard("⭐ Total Ratings", stats.totalRatings, "#f59e0b")}
        </div>
      </div>
    </div>
  );
}

const statCard = (title, value, bg) => (
  <div
    style={{
      backgroundColor: bg,
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      minWidth: "150px",
      fontWeight: "bold",
    }}
  >
    <div>{title}</div>
    <div style={{ fontSize: "24px", marginTop: "5px" }}>{value}</div>
  </div>
);

export default AdminDashboard;
