using ControleGastos.Models;

namespace ControleGastos.DTOs;

public class TransacaoDTO
{
    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
}