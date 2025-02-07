import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import "./Loans.css";
import React from "react";
export function Loans() {
  const [loans, setLoans] = useState([]);
  const [educandos, setEducandos] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [selectedEducando, setSelectedEducando] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");

  // Buscar dados ao carregar a página
  useEffect(() => {
    async function fetchData() {
      try {
        const educandosRes = await apiService.getEducandos();
        const instrumentsRes = await apiService.getInstrumentos();
        const loansRes = await apiService.getHistoricoEmprestimos();

        setEducandos(educandosRes.data);
        setInstruments(instrumentsRes.data);
        setLoans(loansRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  // Criar um novo empréstimo
  const handleCreateLoan = async () => {
    if (!selectedEducando || !selectedInstrument) {
      alert("Selecione um educando e um instrumento.");
      return;
    }

    try {
      const newLoan = {
        educandoId: selectedEducando,
        instrumentoId: selectedInstrument,
        status: "ativo",
      };

      await apiService.createEmprestimo(newLoan);
      alert("Empréstimo registrado com sucesso!");

      // Atualizar lista de empréstimos
      const updatedLoans = await apiService.getHistoricoEmprestimos();
      setLoans(updatedLoans.data);
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
    }
  };

  // Finalizar um empréstimo
  const handleFinishLoan = async (loanId: string) => {
    if (!window.confirm("Tem certeza que deseja finalizar este empréstimo?"))
      return;

    try {
      await apiService.updateEmprestimo(loanId, {
        status: "concluído",
        dataDevolucao: new Date(),
      });
      alert("Empréstimo finalizado!");

      // Atualizar lista de empréstimos
      const updatedLoans = await apiService.getHistoricoEmprestimos();
      setLoans(updatedLoans.data);
    } catch (error) {
      console.error("Erro ao finalizar empréstimo:", error);
    }
  };

  return (
    <div className="loans-container">
      <h1>Controle de Empréstimos</h1>

      {/* Formulário de Registro */}
      <div className="loan-form">
        <h2>Registrar Novo Empréstimo</h2>
        <select
          value={selectedEducando}
          onChange={(e) => setSelectedEducando(e.target.value)}
        >
          <option value="">Selecione o Educando</option>
          {educandos.map((educando: any) => (
            <option key={educando.id} value={educando.id}>
              {educando.user.nome}
            </option>
          ))}
        </select>

        <select
          value={selectedInstrument}
          onChange={(e) => setSelectedInstrument(e.target.value)}
        >
          <option value="">Selecione o Instrumento</option>
          {instruments
            .filter(
              (inst: any) =>
                !loans.some(
                  (loan: any) =>
                    loan.instrumentoId === inst.id && loan.status === "ativo"
                )
            )
            .map((instrument: any) => (
              <option key={instrument.id} value={instrument.id}>
                {instrument.tipo} - {instrument.numero}
              </option>
            ))}
        </select>

        <button onClick={handleCreateLoan}>Registrar Empréstimo</button>
      </div>

      {/* Lista de Empréstimos */}
      <div className="loan-list">
        <h2>Empréstimos Ativos</h2>
        <ul>
          {loans
            .filter((loan: any) => loan.status === "ativo")
            .map((loan: any) => (
              <li key={loan.id}>
                {loan.educando.user.nome} → {loan.instrumento.tipo} -{" "}
                {loan.instrumento.numero}
                <button onClick={() => handleFinishLoan(loan.id)}>
                  Finalizar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
