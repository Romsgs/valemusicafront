import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import "./Users.css";
import { UserModal } from "../components/UserModal";
import { RoleModal } from "../components/RoleModal";
import React from "react";

export interface IUser {
  id: string;
  nome: string;
  email: string;
  role: string;
}

export function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await apiService.getUsers();
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Erro: Resposta da API não é um array", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  const handleOpenUserModal = (user: IUser | null = null) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleOpenRoleModal = (user: IUser) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  return (
    <div className="users-container">
      <h1>Gerenciamento de Usuários</h1>
      <button className="add-user-btn" onClick={() => handleOpenUserModal()}>
        Adicionar Usuário
      </button>
      <div className="user-list">
        <h2>Lista de Usuários</h2>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.nome} - {user.email} ({user.role})
                <div>
                  <button onClick={() => handleOpenUserModal(user)}>
                    ✏ Dados principais
                  </button>
                  <button onClick={() => handleOpenRoleModal(user)}>
                    ✏ Dados pessoais
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </ul>
      </div>

      {isUserModalOpen && selectedUser !== undefined && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
      {isRoleModalOpen && selectedUser && (
        <RoleModal
          user={selectedUser}
          onClose={() => setIsRoleModalOpen(false)}
        />
      )}
    </div>
  );
}
