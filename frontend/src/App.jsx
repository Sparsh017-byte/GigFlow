import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostGig />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs/:id"
          element={
            <ProtectedRoute>
              <GigDetails />
            </ProtectedRoute>
          }
        />

        {/* 🌐 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    </AuthProvider>
    
  );
}



