import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StoreList from "./pages/StoreList";
import Navbar from "./components/Navbar";
import RateStore from "./pages/RateStore";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageStores from "./pages/ManageStores";
import ManageUsers from "./pages/ManageUsers";
import CreateUser from "./pages/CreateUser";

function App() {
  const role = (localStorage.getItem("role") || "").toUpperCase().trim();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<StoreList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Rating - Only logged users */}
        <Route
          path="/rate/:id"
          element={isLoggedIn ? <RateStore /> : <Navigate to="/login" />}
        />

        {/* Admin Pages - Only ADMIN */}
        <Route
          path="/admin/dashboard"
          element={role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/stores"
          element={role === "ADMIN" ? <ManageStores /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/users"
          element={role === "ADMIN" ? <ManageUsers /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/create-user"
          element={role === "ADMIN" ? <CreateUser /> : <Navigate to="/login" />}
        />

        {/* Unknown Route → Redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
