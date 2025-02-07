import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import "./Modal.css";
import React from "react";

export function UserModal({ user, onClose }) {
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [cpf, setCpf] = useState(user?.cpf || "");
  const [role, setRole] = useState(user?.role || "educando");

  if (!user) return null;
  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setCpf(user.cpf);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const userData = { nome, email, cpf, senha: "123456", role };

      if (user) {
        await apiService.updateUser(user.id, userData);
      } else {
        await apiService.createUser(userData);
      }

      alert("Usuário salvo com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? "Editar Usuário" : "Adicionar Usuário"}</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="educando">Educando</option>
          <option value="educador">Educador</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSave}>Salvar</button>
        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
