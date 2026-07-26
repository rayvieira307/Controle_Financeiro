import PessoaForm from "../components/PessoaForm";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Cabeçalho principal. */}
      <header className="dashboard-header">
        <div className="header-top">
          <div className="header-content">
            <div className="logo-section">
              <div>
                <h1> CONTROLE FINANCEIRO </h1>
                <p className="subtitle">
                  Sistema de Gestão de Gastos Residenciais
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Apresenta uma visão geral sobre o funcionamento do sistema. */}
      <section className="overview-section" aria-labelledby="overview-title">
        <h2 id="overview-title" className="section-title">
          Visão Geral do Sistema
        </h2>

        <div className="overview-grid">
          <article className="overview-card info-card">
            <header className="card-header">
              <h3>O que é?</h3>
              <span className="card-icon" aria-hidden="true">
                ℹ️
              </span>
            </header>
            <p>
              Um sistema completo e intuitivo para gerenciar receitas e despesas
              do seu lar. Ideal para quem deseja manter suas finanças
              organizadas e sempre sob controle.
            </p>
          </article>

          <article className="overview-card target-card">
            <header className="card-header">
              <h3>Objetivo</h3>
              <span className="card-icon" aria-hidden="true">
                🎯
              </span>
            </header>
            <p>
              Fornecer uma solução centralizada e segura para rastrear
              transações financeiras, consultar saldos e tomar decisões baseadas
              em dados reais.
            </p>
          </article>

          <article className="overview-card benefit-card">
            <header className="card-header">
              <h3>Benefícios</h3>
              <span className="card-icon" aria-hidden="true">
                ⭐
              </span>
            </header>
            <p>
              Transparência, organização, controle total
              sobre receitas e despesas, e persistência de dados para histórico
              completo.
            </p>
          </article>
        </div>
      </section>

      {/* Orienta o usuário sobre o fluxo de utilização da aplicação. */}
      <section className="usage-section" aria-labelledby="usage-title">
        <h2 id="usage-title" className="section-title">
          Como Usar - Passo a Passo
        </h2>

        <ol className="steps-container">
          <li className="step-card">
            <div className="step-number" aria-hidden="true">
              1
            </div>
            <div className="step-content">
              <h3>Criar Perfil de Pessoa</h3>
              <p>
                Comece preenchendo o formulário abaixo com os dados da pessoa.
                Especifique a data de nascimento para ativar as restrições de
                idade.
              </p>
              <ul className="step-tips">
                <li>Nome completo</li>
                <li>Idade</li>
              </ul>
            </div>
          </li>

          <li className="step-arrow" aria-hidden="true">
            →
          </li>

          <li className="step-card">
            <div className="step-number" aria-hidden="true">
              2
            </div>
            <div className="step-content">
              <h3>Registrar Transações</h3>
              <p>
                Após criar a pessoa, acesse a página de Transações para
                registrar receitas e despesas.
              </p>
              <ul className="step-tips">
                <li>Selecione a pessoa</li>
                <li>Indique o tipo (receita/despesa)</li>
                <li>Adicione valor e descrição</li>
              </ul>
            </div>
          </li>

          <li className="step-arrow" aria-hidden="true">
            →
          </li>

          <li className="step-card">
            <div className="step-number" aria-hidden="true">
              3
            </div>
            <div className="step-content">
              <h3>Consultar Totais</h3>
              <p>
                Verifique os saldos em tempo real na página de Totais. Veja
                relatórios por pessoa e o saldo geral do sistema.
              </p>
              <ul className="step-tips">
                <li>Saldo individual</li>
                <li>Saldo total</li>
                <li>Histórico de transações</li>
              </ul>
            </div>
          </li>
        </ol>
      </section>

      {/* Seção dedicada às regras de idade e permissões do cadastro para que a informação seja
      clara*/}
      <section
        className="restrictions-section"
        aria-labelledby="restrictions-title"
      >
        <article className="restriction-card">
          <header className="restriction-header">
            <span className="restriction-icon" aria-hidden="true">
              ⚠️
            </span>
            <h3 id="restrictions-title">
              <h3>Importante: Restrições por Idade</h3>
            </h3>
          </header>

          <div className="restriction-content">
            <div className="restriction-item">
              <span className="restriction-badge">Menores de Idade</span>
              <p>
                Podem registrar apenas <strong>despesas</strong>. Receitas
                requerem maioridade.
              </p>
            </div>

            <div className="restriction-item">
              <span className="restriction-badge">Maiores de Idade</span>
              <p>
                Acesso total ao sistema com permissão para registrar receitas e
                despesas.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Seção de cadastro */}
      <section className="form-section" aria-labelledby="person-form-title">
        <div className="form-container">
          <PessoaForm />
        </div>
      </section>
    </main>
  );
}
