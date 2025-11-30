import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toUpperCase().trim();

  // Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout successful!");
    navigate("/login");
  };

  const styles = {
    navbar: {
      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
      padding: "0.75rem 1.5rem",
    },
    brand: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
    },
    link: {
      color: "#fff",
      marginLeft: "15px",
      textDecoration: "none",
      transition: "0.3s",
    },
    linkHover: {
      color: "#facc15",
    },
    navMenu: {
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
      padding: "10px",
    },
    togglerIcon: {
      filter: "invert(1)",
    },
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <Link className="navbar-brand" to="/" style={styles.brand}>
        Store Rating
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        style={{ border: "none" }}
      >
        <span className="navbar-toggler-icon" style={styles.togglerIcon}></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ms-auto" style={styles.navMenu}>
          {/* Always visible */}
          <Link
            className="nav-link"
            to="/"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Stores
          </Link>

          {/* If not logged in → Show Login & Signup */}
          {!token ? (
            <>
              <Link
                className="nav-link"
                to="/login"
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
              >
                Login
              </Link>
              <Link
                className="nav-link"
                to="/signup"
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Role-based access */}
              {role === "ADMIN" && (
                <Link
                  className="nav-link"
                  to="/admin"
                  style={styles.link}
                >
                  Admin Panel
                </Link>
              )}

              {role === "STORE_OWNER" && (
                <Link
                  className="nav-link"
                  to="/dashboard"
                  style={styles.link}
                >
                  Owner Dashboard
                </Link>
              )}

              {role === "USER" && (
                <Link
                  className="nav-link"
                  to="/dashboard"
                  style={styles.link}
                >
                  User Dashboard
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  ...styles.link,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
