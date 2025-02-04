import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="content">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
