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
    if (!tipo || !tamanho || !numero || !condicao) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

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

      // Limpar os campos após o cadastro
      setTipo("");
      setTamanho("");
      setNumero("");
      setCondicao("");
      setObservacao("");
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
    <div className="instruments-container">
      <h1>Gerenciamento de Instrumentos</h1>

      {/* Formulário de Cadastro */}
      <div className="instrument-form">
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
          placeholder="Observação (Opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />
        <button onClick={handleCreateInstrument}>
          ➕ Cadastrar Instrumento
        </button>
      </div>

      {/* Listagem de Instrumentos */}
      <div className="instrument-list">
        <h2>Lista de Instrumentos</h2>
        <ul>
          {instruments.length > 0 ? (
            instruments.map((instrument: any) => (
              <li key={instrument.id} className="instrument-item">
                <div className="instrument-item_container">
                  {instrument.numero} - {instrument.tipo} - {instrument.tamanho}{" "}
                  - {instrument.condicao}
                </div>
                <button
                  className="button-instruments"
                  onClick={() => handleDeleteInstrument(instrument.id)}
                >
                  ❌ Excluir
                </button>
              </li>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>
              Nenhum instrumento encontrado.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
