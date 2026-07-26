namespace ControleGastos.Exceptions;

public class ErrorResponse
{
    // Indica se a operação foi concluída com sucesso.
    public bool Sucesso { get; set; }
   // Mensagem resumida descrevendo o erro.
    public string Mensagem { get; set; } = string.Empty;

   // Detalhes adicionais sobre a exceção se for necessario.
   // se não tiver fica nulo mesmo.
    public string? Detalhe { get; set; }
}