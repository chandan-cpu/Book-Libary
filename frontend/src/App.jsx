import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CatalogPage from "./components/pages/CatalogPage";
import ProfilePage from "./components/pages/ProfilePage";
import Navbar from "./components/Navbar";
import { LibraryProvider } from "./components/context/LibraryContext";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import BookAdminPanel from "./components/admin/BookAdminPanel";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const insideNavigation = (
    <LibraryProvider>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "catalog" && <CatalogPage />}
      {currentPage === "profile" && <ProfilePage />}
    </LibraryProvider>
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginForm
            onAuthSuccess={() => setIsAuthenticated(true)}
            setCurrentPage={setCurrentPage}
          />
        }
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/app" : "/login"} />} />
      <Route path="/signup" element={<SignupForm />} />

      <Route path="/app" element={isAuthenticated ? insideNavigation : <Navigate to="/login" />} />
      

      <Route path="/admin" element={isAuthenticated ? <BookAdminPanel /> : <Navigate to="/login" />} />

   
    </Routes>
  );
}

