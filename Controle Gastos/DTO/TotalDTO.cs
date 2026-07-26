namespace ControleGastos.DTOs;

//total de receitas, despesas e saldo do usuário
public class TotalDTO
{
    public string Nome { get; set; } = string.Empty;

    public decimal Receitas { get; set; }

    public decimal Despesas { get; set; }

    public decimal Saldo { get; set; }
}