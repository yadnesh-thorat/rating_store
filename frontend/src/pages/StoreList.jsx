import React, { useEffect, useState } from "react";
import api from "../api"; // 👈 use custom instance
import { Link, useNavigate } from "react-router-dom";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/store/all")
      .then((res) => setStores(res.data))
      .catch((err) => console.error("Error fetching stores:", err));
  }, []);

  const handleRate = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to rate a store.");
      return navigate("/login");
    }
    navigate(`/rate/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Stores</h2>

      {/* 🔍 Simple Search */}
      <input
        type="text"
        placeholder="Search stores by name or address..."
        className="form-control mb-4"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row d-flex justify-content-center">
        {stores
          .filter(
            (store) =>
              store.name.toLowerCase().includes(search) ||
              store.address.toLowerCase().includes(search)
          )
          .map((store) => (
            <div key={store.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm border-0" style={{ padding: "15px" }}>
                <h5>{store.name}</h5>
                <p>
                  📍 {store.address} <br />
                  ⭐ Avg Rating:{" "}
                  {store.avg_rating
                    ? Number(store.avg_rating).toFixed(1)
                    : "No ratings"}
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleRate(store.id)}
                >
                  Rate Store
                </button>
              </div>
            </div>
          ))}

        {stores.length === 0 && (
          <p className="text-center">No stores available.</p>
        )}
      </div>
    </div>
  );
}

export default StoreList;
