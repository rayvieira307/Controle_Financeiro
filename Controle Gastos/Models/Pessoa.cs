namespace ControleGastos.Models;

/// Representa uma pessoa cadastrada no sistema.
/// Cada pessoa pode possuir várias transações.

public class Pessoa
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public int Idade { get; set; }

    // Relacionamento 1:N
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}