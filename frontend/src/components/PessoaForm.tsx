import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import type { Pessoa } from "../types/Pessoa";
import "../styles/PessoaForm.css";

export default function PessoaForm() {
  const navigate = useNavigate();


  // Estado que armazena os dados da pessoa preenchidos no formulário.
  const [pessoa, setPessoa] = useState<Pessoa>({
    id: 0,
    nome: "",
    idade: 0,
  });

// Envia os dados da pessoa para a API e, após o cadastro,
// e manda para a tela de transações.
  async function cadastrarPessoa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post("/Pessoas", pessoa);
  
      setTimeout(() => {
        navigate("/transacoes", {
          state: response.data,
        });
      }, 900);
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <section className="pessoa-form" aria-labelledby="pessoa-form-title">
      <h2 id="pessoa-form-title">FAÇA SEU CADASTRO AQUI</h2>

      <form onSubmit={cadastrarPessoa}>
        {/* Formulário responsável por coletar as informações da pessoa.. */
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={pessoa.nome}
            // Atualiza o nome da pessoa sempre que o usuário digita.
            onChange={(e) => setPessoa({ ...pessoa, nome: e.target.value })}
            required
          />
        </div>

        /* Campo para a idade, usado para validar as regras do sistema. */}
        <div className="campo">
          <label htmlFor="idade">Idade</label>
          <input
            id="idade"
            type="number"
            min={0}
            value={pessoa.idade}
            onChange={(e) =>
              setPessoa({
                ...pessoa,
                idade: Number(e.target.value),
              })
            }
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}
