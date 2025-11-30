import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // ❗ Allow only admin
    const role = (localStorage.getItem("role") || "").toUpperCase().trim();
    if (role !== "ADMIN") {
      alert("Access denied");
      navigate("/login");
      return;
    }

    // 📡 Fetch users
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  // 🔴 Delete user (optional for admin)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/user/delete/${id}`); // Ensure this route exists
      alert("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err.response?.data);
      alert(err.response?.data?.error || "Failed to delete user");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading users...</p>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ margin: "20px", width: "100%" }}>
        <h3>👥 Manage Users</h3>

        {/* 🔍 Simple Search Input */}
        <input
          type="text"
          placeholder="Search by name/email/role..."
          style={searchStyle}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        {/* 🧾 User Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (u) =>
                  u.name.toLowerCase().includes(search) ||
                  u.email.toLowerCase().includes(search) ||
                  u.role.toLowerCase().includes(search) ||
                  (u.address && u.address.toLowerCase().includes(search))
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address || "N/A"}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🎨 Styles
const searchStyle = {
  padding: "8px",
  width: "100%",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid gray",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

const deleteBtnStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default ManageUsers;
