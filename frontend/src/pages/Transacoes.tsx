import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TransacaoForm from "../components/TransacaoForm";
import TotaisTable from "../components/TotaisTable";
import "../styles/Transacao.css";

export default function Transacoes() {
  // Recupera os dados da pessoa enviados pela página de cadastro.

  const { state } = useLocation();

  // Controla a atualização do componente de totais sempre que
  // uma nova transação é cadastrada.
  const [refreshKey, setRefreshKey] = useState(0);

  // Incrementa a chave de atualização para forçar o componente
  // TotaisTable a buscar novamente os dados da API.
  function handleTransacaoCadastrada() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <main className="transacoes">
      <header className="hero-transacao">
        <div className="hero-transacao-copy">
          <Link
            to="/"
            className="back-link"
            aria-label="Voltar para a tela inicial"
          >
            ←
          </Link>
          <p className="hero-kicker">Painel financeiro</p>
          <h1>Transações e Saldos</h1>
          <p>
            Acompanhe entradas, saídas e o desempenho financeiro de forma mais
            visual, clara e organizada.
          </p>
        </div>
        {state ? (
          <aside className="usuario-card">
            <p className="usuario-label">Perfil selecionado</p>
            <h2>{state.nome}</h2>
            <p>{state.idade} anos</p>
          </aside>
        ) : (
          <aside className="usuario-card empty">
            <p className="usuario-label">Status</p>
            <h2>Sem pessoa selecionada</h2>
            <p>Escolha alguém para começar a registrar transações.</p>
          </aside>
        )}
      </header>
      <section
        className="dashboard-grid"
        aria-label="Painel de transações e totais"
      >
        <article className="dashboard-panel">
          <TransacaoForm onTransacaoCadastrada={handleTransacaoCadastrada} />
        </article>

        <article className="dashboard-panel">
          <TotaisTable refreshKey={refreshKey} />
        </article>
      </section>
    </main>
  );
}
//// Exibe os dados da pessoa recebida da tela anterior.
// Tabela que exibe o resumo financeiro atualiza sempre que "refreshKey" muda.
// Sempre que "refreshKey" muda, os dados são buscados novamente na API.