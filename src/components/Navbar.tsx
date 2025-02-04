import "./Navbar.css";
import React from "react";
interface NavbarProps {
  toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰ menu
      </button>
      <h2>Vale Música</h2>
    </nav>
  );
}
