import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import React from "react";
export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await apiService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    fetchUsers();
  }, []);

  console.log("a");

  return (
    <div>
      <h1>Gerenciamento de Usuários 1</h1>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.nome} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
