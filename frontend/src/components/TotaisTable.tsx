import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/TotaisTable.css";

interface TotaisTableProps {
  refreshKey?: number;
}

interface TotalPessoa {
  pessoa: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

interface TotaisResponse {
  pessoas: TotalPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoLiquido: number;
}

// Estados responsáveis por armazenar os dados retornados pela API
// e controlar o carregamento da tela.
export default function TotaisTable({ refreshKey = 0 }: TotaisTableProps) {
  const [dados, setDados] = useState<TotaisResponse>({
    pessoas: [],
    totalReceitas: 0,
    totalDespesas: 0,
    saldoLiquido: 0,
  });

  const [loading, setLoading] = useState(true);

  // Executa a busca dos dados denovo sempre que o componente é montado
  // ou quando o valor de refreshKey é alterado.
  useEffect(() => {
    setLoading(true);
    buscarTotais();
  }, [refreshKey]);

  // Busca os valores da API para montar o resumo financeiro.
  async function buscarTotais() {
    try {
      const response = await api.get("/Totais");
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao buscar totais:", error);
    } finally {
      setLoading(false);
    }
  }

  // Exibe uma mensagem de carregamento até que os dados
  // sejam obtidos da API.
  if (loading) {
    return <p>Carregando totais...</p>;
  }
  if (loading) {
    return <p>Carregando totais...</p>;
  }

  // Formata valores numéricos para o padrão brasileiro.
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <section className="totais" aria-labelledby="totais-title">
      <header>
        <h2 id="totais-title">Resumo Financeiro</h2>
      </header>

      {/* Cartões resumo com os principais valores do período. */}
      <ul className="summary-grid">
        <li className="summary-card">
          <span className="summary-label">Receitas</span>
          <strong>{formatCurrency(dados.totalReceitas)}</strong>
        </li>

        <li className="summary-card">
          <span className="summary-label">Despesas</span>
          <strong>{formatCurrency(dados.totalDespesas)}</strong>
        </li>

        <li
          className={`summary-card ${dados.saldoLiquido >= 0 ? "positive" : "negative"}`}
        >
          <span className="summary-label">Saldo líquido</span>
          <strong>{formatCurrency(dados.saldoLiquido)}</strong>
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Pessoa</th>
            <th scope="col">Receitas</th>
            <th scope="col">Despesas</th>
            <th scope="col">Saldo</th>
          </tr>
        </thead>

        <tbody>
          {dados.pessoas.map((pessoa) => (
            <tr key={pessoa.pessoa}>
              <th scope="row">{pessoa.pessoa}</th>
              <td>{formatCurrency(pessoa.receitas)}</td>
              <td>{formatCurrency(pessoa.despesas)}</td>
              <td>{formatCurrency(pessoa.saldo)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th scope="row">Total Geral</th>
            <td>
              <strong>{formatCurrency(dados.totalReceitas)}</strong>
            </td>
            <td>
              <strong>{formatCurrency(dados.totalDespesas)}</strong>
            </td>
            <td>
              <strong>{formatCurrency(dados.saldoLiquido)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

// Rodapé da tabela com a soma geral das receitas,
// despesas e saldo líquido.
