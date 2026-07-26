namespace ControleGastos.DTOs;

public class PessoaResponseDTO
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public int Idade { get; set; }

    public List<TransacaoResponseDTO> Transacoes { get; set; } = new();
}