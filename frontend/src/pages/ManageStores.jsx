import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api";
import { useNavigate } from "react-router-dom";

function ManageStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const role = (localStorage.getItem("role") || "").toUpperCase().trim();
    if (role !== "ADMIN") {
      alert("Access denied");
      navigate("/login");
      return;
    }

   
    api
      .get("/admin/stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.error("Error fetching stores:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;

    try {
      await api.delete(`/store/delete/${id}`); // 👈 Ensure backend route exists
      alert("Store deleted successfully");
      setStores(stores.filter((store) => store.id !== id));
    } catch (err) {
      console.error("Error deleting store:", err.response?.data);
      alert(err.response?.data?.error || "Failed to delete store");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading stores...</p>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ margin: "20px", width: "100%" }}>
        <h3>🏪 Manage Stores</h3>

        {}
        <input
          type="text"
          placeholder="Search store..."
          style={searchStyle}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        {}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Owner Email</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores
              .filter(
                (store) =>
                  store.name.toLowerCase().includes(search) ||
                  (store.owner_email &&
                    store.owner_email.toLowerCase().includes(search)) ||
                  store.address.toLowerCase().includes(search)
              )
              .map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.owner_email || "N/A"}</td>
                  <td>{store.address}</td>
                  <td>{store.avg_rating || "N/A"}</td>
                  <td>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(store.id)}
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
  marginTop: "20px",
  border: "1px solid #ddd",
};

const deleteBtnStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ManageStores;
