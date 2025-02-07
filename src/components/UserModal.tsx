import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import "./Modal.css";
import React from "react";
import { IUser } from "../pages/Users";

interface UserModalProps {
  user: IUser | null;
  onClose: () => void;
  onSave: () => void;
}

export function UserModal({ user, onClose, onSave }: UserModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("educando");

  // Atualiza os campos quando um usuário é selecionado para edição
  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setCpf(user.cpf || ""); // Evita undefined no CPF
      setRole(user.role);
    } else {
      // Se for um novo usuário, reseta os campos
      setNome("");
      setEmail("");
      setCpf("");
      setRole("educando");
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
      onSave(); // Recarrega a lista de usuários
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
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
