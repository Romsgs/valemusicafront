import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { Instruments } from "../pages/Instruments";
import { Loans } from "../pages/Loans";
import React from "react";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/instrumentos" element={<Instruments />} />
      <Route path="/emprestimos" element={<Loans />} />
    </Routes>
  );
}
