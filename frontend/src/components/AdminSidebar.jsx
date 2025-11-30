import React from "react";

function AdminSidebar() {
  const sidebarStyle = {
    height: "100vh",
    minWidth: "220px",
    backgroundColor: "#1e1e2f",
    color: "white",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "15px",
    transition: "background 0.3s, color 0.3s",
  };

  const onHover = (e) => {
    e.target.style.backgroundColor = "#34344b";
    e.target.style.color = "#facc15";
  };

  const onLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "white";
  };

  return (
    <div style={sidebarStyle}>
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Admin Panel</h3>
      <hr style={{ borderColor: "gray" }} />

      <ul className="list-unstyled" style={{ paddingLeft: "0" }}>
        <li className="mb-1">
          <a href="/admin" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            📊 Dashboard
          </a>
        </li>
        <li className="mb-1">
          <a href="/admin/stores" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            🏪 Stores
          </a>
        </li>
        <li className="mb-1">
          <a href="/admin/users" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            👥 Users
          </a>
        </li>
        <li className="mb-1">
          <a href="/admin/create-user" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            ➕ Create User
          </a>
        </li>
        <li className="mb-1">
          <a href="/admin/ratings" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            ⭐ Ratings
          </a>
        </li>
        <li className="mb-1">
          <a href="/admin/profile" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
            👤 Profile
          </a>
        </li>
        <li className="mt-4">
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
