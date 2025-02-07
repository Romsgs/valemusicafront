import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import "./RoleModal.css";
import React from "react";
interface IUser {
  id: string;
  nome: string;
  email: string;
  role: string;
}

interface RoleModalProps {
  user: IUser;
  onClose: () => void;
}

export function RoleModal({ user, onClose }: RoleModalProps) {
  const [role, setRole] = useState(user.role);

  // Campos específicos para cada role
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [course, setCourse] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [responsible1Name, setResponsible1Name] = useState("");
  const [responsible1Cpf, setResponsible1Cpf] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [titulacao, setTitulacao] = useState("");

  useEffect(() => {
    if (user.role === "educando") {
      // Buscar os dados do Educando caso já exista
      apiService.getEducandos().then((res) => {
        const educando = res.data.find((e: any) => e.userId === user.id);
        if (educando) {
          setEnrollmentNumber(educando.enrollment_number || "");
          setCourse(educando.course || "");
          setAcademicYear(educando.academic_year || "");
          setResponsible1Name(educando.responsible1_name || "");
          setResponsible1Cpf(educando.responsible1_cpf || "");
        }
      });
    } else if (user.role === "educador") {
      // Buscar os dados do Educador caso já exista
      apiService.getEducadores().then((res) => {
        const educador = res.data.find((e: any) => e.userId === user.id);
        if (educador) {
          setEspecialidade(educador.especialidade || "");
          setTitulacao(educador.titulacao || "");
        }
      });
    }
  }, [user.role, user.id]);

  const handleUpdateRole = async () => {
    try {
      await apiService.updateUser(user.id, { role });

      if (role === "educando") {
        await apiService.createEducando({
          userId: user.id,
          enrollment_number: enrollmentNumber,
          course,
          academic_year: academicYear,
          responsible1_name: responsible1Name,
          responsible1_cpf: responsible1Cpf,
        });
      } else if (role === "educador") {
        await apiService.createEducador({
          userId: user.id,
          especialidade,
          titulacao,
        });
      }

      alert("Permissão atualizada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar permissão:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Gerenciar Permissões de {user.nome}</h2>

        {/* Seleção de Role */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="educando">Educando</option>
          <option value="educador">Educador</option>
          <option value="admin">Admin</option>
        </select>

        {/* Campos específicos para Educando */}
        {role === "educando" && (
          <>
            <input
              type="text"
              placeholder="Matrícula"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Curso"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ano Acadêmico"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nome do Responsável 1"
              value={responsible1Name}
              onChange={(e) => setResponsible1Name(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF do Responsável 1"
              value={responsible1Cpf}
              onChange={(e) => setResponsible1Cpf(e.target.value)}
            />
          </>
        )}

        {/* Campos específicos para Educador */}
        {role === "educador" && (
          <>
            <input
              type="text"
              placeholder="Especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
            <input
              type="text"
              placeholder="Titulação"
              value={titulacao}
              onChange={(e) => setTitulacao(e.target.value)}
            />
          </>
        )}

        <button onClick={handleUpdateRole}>Salvar</button>
        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
