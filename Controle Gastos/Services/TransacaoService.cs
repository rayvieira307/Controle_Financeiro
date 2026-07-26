using ControleGastos.Data;
using ControleGastos.DTOs;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services;

/// Responsável pelas regras de negócio das transações.
public class TransacaoService
{
    private readonly AppDbContext _context;

    public TransacaoService(AppDbContext context)
    {
        _context = context;
    }

 // Lista todas as transações cadastradas.
// Retorna somente os dados necessários para a API,
// evitando expor o objeto Pessoa completo e criar ciclos JSON.
public async Task<List<TransacaoResponseDTO>> ListarAsync()
{
    return await _context.Transacoes
        .AsNoTracking()
        .Select(t => new TransacaoResponseDTO
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            Tipo = t.Tipo,
            PessoaId = t.PessoaId,
            NomePessoa = t.Pessoa.Nome
        })
        .ToListAsync();
}

    public async Task<(bool Sucesso, string Mensagem)> CriarAsync(TransacaoDTO dto)
    {
        // Verifica se a pessoa existe
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

        if (pessoa == null)
        {
            return (false, "Pessoa não encontrada.");
        }

        // Regra de negócio
        // Menores de idade podem possuir apenas despesas.
        if (pessoa.Idade < 18 &&
            dto.Tipo == TipoTransacao.Receita)
        {
            return (false,
                "Menores de idade podem cadastrar apenas despesas.");
        }

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);

        await _context.SaveChangesAsync();

        return (true, "Transação cadastrada com sucesso.");
    }
}