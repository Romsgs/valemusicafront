import axios from "axios";

// Definição da URL base da API
const API_BASE_URL = "http://localhost:3000"; // Altere conforme necessário

// Configuração do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Classe para gerenciar as requisições da API
class ApiService {
  // Usuários (GET, POST, PATCH, DELETE)
  async getUsers() {
    return api.get("/users");
  }

  async createUser(userData: any) {
    return api.post("/users", userData);
  }

  async updateUser(userId: string, userData: any) {
    return api.patch(`/users/${userId}`, userData);
  }

  async deleteUser(userId: string) {
    return api.delete(`/users/${userId}`);
  }

  // Educandos (GET, POST, PATCH, DELETE)
  async getEducandos() {
    return api.get("/educandos");
  }

  async createEducando(educandoData: any) {
    return api.post("/educandos", educandoData);
  }

  async updateEducando(educandoId: string, educandoData: any) {
    return api.patch(`/educandos/${educandoId}`, educandoData);
  }

  async deleteEducando(educandoId: string) {
    return api.delete(`/educandos/${educandoId}`);
  }

  // Educadores (GET, POST, PATCH, DELETE)
  async getEducadores() {
    return api.get("/educadores");
  }

  async createEducador(educadorData: any) {
    return api.post("/educadores", educadorData);
  }

  async updateEducador(educadorId: string, educadorData: any) {
    return api.patch(`/educadores/${educadorId}`, educadorData);
  }

  async deleteEducador(educadorId: string) {
    return api.delete(`/educadores/${educadorId}`);
  }

  // Instrumentos (GET, POST, PATCH, DELETE)
  async getInstrumentos() {
    return api.get("/instrumentos");
  }

  async createInstrumento(instrumentoData: any) {
    return api.post("/instrumentos", instrumentoData);
  }

  async updateInstrumento(instrumentoId: string, instrumentoData: any) {
    return api.patch(`/instrumentos/${instrumentoId}`, instrumentoData);
  }

  async deleteInstrumento(instrumentoId: string) {
    return api.delete(`/instrumentos/${instrumentoId}`);
  }

  // Histórico de Empréstimos (GET, POST, PATCH, DELETE)
  async getHistoricoEmprestimos() {
    return api.get("/historico-emprestimos");
  }

  async createEmprestimo(emprestimoData: any) {
    return api.post("/historico-emprestimos", emprestimoData);
  }

  async updateEmprestimo(emprestimoId: string, emprestimoData: any) {
    return api.patch(`/historico-emprestimos/${emprestimoId}`, emprestimoData);
  }

  async deleteEmprestimo(emprestimoId: string) {
    return api.delete(`/historico-emprestimos/${emprestimoId}`);
  }
}

// Exporta a instância do serviço
export const apiService = new ApiService();
