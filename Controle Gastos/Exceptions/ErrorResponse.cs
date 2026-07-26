namespace ControleGastos.Exceptions;

public class ErrorResponse
{
    public bool Sucesso { get; set; }

    public string Mensagem { get; set; } = string.Empty;

    public string? Detalhe { get; set; }
}