import { useEffect, useState, type FormEvent } from "react";
import api from "../api/api";
import type { Pessoa } from "../types/Pessoa";
import { TipoTransacao, type Transacao } from "../types/Transacao";
import "../styles/TransacaoForm.css";

interface TransacaoFormProps {
  onTransacaoCadastrada?: () => void;
}

export default function TransacaoForm({
  onTransacaoCadastrada,
}: TransacaoFormProps) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [transacao, setTransacao] = useState<Transacao>({
    descricao: "",
    valor: 0,
    tipo: TipoTransacao.Despesa,
    pessoaId: 0,
  });

  useEffect(() => {
    carregarPessoas();
  }, []);

  // Busca a lista de pessoas cadastradas para preencher o seleção do formulário.
  async function carregarPessoas() {
    try {
      const response = await api.get("/Pessoas");
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao carregar pessoas", error);
    }
  }

  // Envia a nova transação para a API e limpa o formulário após o sucesso.
  async function cadastrarTransacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post("/Transacoes", transacao);

      setTransacao({
        descricao: "",
        valor: 0,
        tipo: TipoTransacao.Despesa,
        pessoaId: transacao.pessoaId,
      });

      onTransacaoCadastrada?.();
    } catch (error) {
      console.error(error);
    }
  }

  const pessoaSelecionada = pessoas.find(
    (pessoa) => pessoa.id === transacao.pessoaId,
  );

  const menorDeIdade =
    pessoaSelecionada?.idade !== undefined && pessoaSelecionada.idade < 18;

  return (
    <section className="transacao-form" aria-labelledby="transacao-form-title">
      <header>
        <h2 id="transacao-form-title">Cadastro de Transações</h2>
      </header>

      <form onSubmit={cadastrarTransacao}>
        {/* Seletor da pessoa vinculada à transação. */}
        <div className="campo">
          <label htmlFor="pessoa">Pessoa</label>
          <select
            id="pessoa"
            value={transacao.pessoaId}
            onChange={(e) =>
              setTransacao({
                ...transacao,
                pessoaId: Number(e.target.value),
                tipo: TipoTransacao.Despesa,
              })
            }
            required
          >
            <option value={0}>Selecione uma pessoa</option>

            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Descrição da transação registrada. */}
        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            type="text"
            value={transacao.descricao}
            onChange={(e) =>
              setTransacao({
                ...transacao,
                descricao: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Valor monetário da transação. */}
        <div className="campo">
          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            type="text"
            inputMode="decimal"
            value={transacao.valor === 0 ? "" : transacao.valor}
            onChange={(e) => {
              const valorDigitado = e.target.value;
              if (valorDigitado === "") {
                setTransacao({ ...transacao, valor: 0 });
                return;
              }

              const valorNumerico = Number(valorDigitado.replace(",", "."));
              if (!Number.isNaN(valorNumerico)) {
                setTransacao({ ...transacao, valor: valorNumerico });
              }
            }}
            required
          />
        </div>

        {/* Tipo da transação, com regra específica para menores de idade. */}
        <div className="campo">
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            value={transacao.tipo}
            onChange={(e) =>
              setTransacao({
                ...transacao,
                tipo: Number(e.target.value) as typeof transacao.tipo,
              })
            }
          >
            {!menorDeIdade && (
              <option value={TipoTransacao.Receita}>Receita</option>
            )}

            <option value={TipoTransacao.Despesa}>Despesa</option>
          </select>

          {menorDeIdade && (
            <small>
              Pessoas menores de 18 anos podem cadastrar apenas despesas.
            </small>
          )}
        </div>

        <button type="submit">Cadastrar Transação</button>
      </form>
    </section>
  );
}
