import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import React from "react";
import "./Instruments.css";
export function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [tipo, setTipo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [numero, setNumero] = useState("");
  const [condicao, setCondicao] = useState("");
  const [observacao, setObservacao] = useState("");

  // Buscar todos os instrumentos
  useEffect(() => {
    async function fetchInstruments() {
      try {
        const response = await apiService.getInstrumentos();
        setInstruments(response.data);
      } catch (error) {
        console.error("Erro ao buscar instrumentos:", error);
      }
    }

    fetchInstruments();
  }, []);

  // Criar um novo instrumento
  const handleCreateInstrument = async () => {
    try {
      const novoInstrumento = {
        tipo,
        tamanho,
        numero: Number(numero),
        condicao,
        observacao,
        ativo: true,
      };

      await apiService.createInstrumento(novoInstrumento);
      alert("Instrumento cadastrado com sucesso!");

      // Atualizar lista de instrumentos
      const response = await apiService.getInstrumentos();
      setInstruments(response.data);
    } catch (error) {
      console.error("Erro ao criar instrumento:", error);
    }
  };

  // Deletar um instrumento
  const handleDeleteInstrument = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este instrumento?"))
      return;

    try {
      await apiService.deleteInstrumento(id);
      alert("Instrumento removido com sucesso!");

      // Atualizar lista de instrumentos
      const response = await apiService.getInstrumentos();
      setInstruments(response.data);
    } catch (error) {
      console.error("Erro ao deletar instrumento:", error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Instrumentos</h1>

      {/* Formulário de Cadastro */}
      <div>
        <h2>Adicionar Novo Instrumento</h2>
        <input
          type="text"
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tamanho"
          value={tamanho}
          onChange={(e) => setTamanho(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Condição"
          value={condicao}
          onChange={(e) => setCondicao(e.target.value)}
        />
        <input
          type="text"
          placeholder="Observação"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />
        <button onClick={handleCreateInstrument}>Cadastrar Instrumento</button>
      </div>

      {/* Listagem de Instrumentos */}
      <div>
        <h2>Lista de Instrumentos</h2>
        <ul>
          {instruments.map((instrument: any) => (
            <li key={instrument.id} className="listaInstrumentos">
              {instrument.numero} - {instrument.tipo} - {instrument.tamanho} -{" "}
              {instrument.condicao}
              <button onClick={() => handleDeleteInstrument(instrument.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
