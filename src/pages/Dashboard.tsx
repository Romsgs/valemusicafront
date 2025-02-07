import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import "./Dashboard.css";
import React from "react";
export function Dashboard() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalEducandos, setTotalEducandos] = useState(0);
  const [totalEducadores, setTotalEducadores] = useState(0);
  const [totalInstrumentos, setTotalInstrumentos] = useState(0);
  const [totalEmprestimosAtivos, setTotalEmprestimosAtivos] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const usuarios = await apiService.getUsers();
        const educandos = await apiService.getEducandos();
        const educadores = await apiService.getEducadores();
        const instrumentos = await apiService.getInstrumentos();
        const emprestimos = await apiService.getHistoricoEmprestimos();

        setTotalUsuarios(usuarios.data.length);
        setTotalEducandos(educandos.data.length);
        setTotalEducadores(educadores.data.length);
        setTotalInstrumentos(instrumentos.data.length);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Usuários</h2>
          <p>{totalUsuarios}</p>
        </div>
        <div className="card">
          <h2>Educandos</h2>
          <p>{totalEducandos}</p>
        </div>
        <div className="card">
          <h2>Educadores</h2>
          <p>{totalEducadores}</p>
        </div>
        <div className="card">
          <h2>Instrumentos</h2>
          <p>{totalInstrumentos}</p>
        </div>
      </div>
    </div>
  );
}
