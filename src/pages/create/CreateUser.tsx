import { useState } from "react";
import { apiService } from "../../services/api";
import React from "react";
export function Users() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {
    try {
      await apiService.createUser({
        nome,
        email,
        senha: "123456",
        cpf: "12345678900",
        role: "educando",
      });
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
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
      <button onClick={handleCreateUser}>Criar Usuário</button>
    </div>
  );
}
