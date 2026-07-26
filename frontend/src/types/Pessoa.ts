export interface Pessoa {
  id: number;

  nome: string;

  idade: number;

  transacoes?: Transacao[];
}

export interface Transacao {
  id?: number;

  descricao: string;

  valor: number;

  tipo: number;

  pessoaId: number;
}

export interface Totais {
  pessoas: TotalPessoa[];

  totalReceitas: number;

  totalDespesas: number;

  saldoLiquido: number;
}

export interface TotalPessoa {
  pessoa: string;

  receitas: number;

  despesas: number;

  saldo: number;
}
