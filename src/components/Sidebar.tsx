import { Link } from "react-router-dom";
import "./Sidebar.css";
import React from "react";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "hidden"}`}>
      {/* Exibir botão de fechar apenas no mobile */}
      <button className="close-sidebar" onClick={toggleSidebar}>
        ✖
      </button>
      <h1>Gestão de Alunos</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/usuarios" onClick={toggleSidebar}>
              Usuários
            </Link>
          </li>
          <li>
            <Link to="/instrumentos" onClick={toggleSidebar}>
              Instrumentos
            </Link>
          </li>
          <li>
            <Link to="/emprestimos" onClick={toggleSidebar}>
              Empréstimos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
