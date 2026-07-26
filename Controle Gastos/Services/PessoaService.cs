using ControleGastos.Data;
using ControleGastos.DTOs;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services;

/// <summary>
/// Responsável pelas regras de negócio relacionadas às pessoas.
/// </summary>
public class PessoaService
{
    private readonly AppDbContext _context;

    public PessoaService(AppDbContext context)
    {
        _context = context;
    }


    // Retorna todas as pessoas cadastradas.
    // Usa ResponseDTO para evitar ciclos entre Pessoa e Transacao.
    public async Task<List<PessoaResponseDTO>> ListarAsync()
    {
        return await _context.Pessoas
            .AsNoTracking()
            .Select(p => new PessoaResponseDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade,

                Transacoes = p.Transacoes
                    .Select(t => new TransacaoResponseDTO
                    {
                        Id = t.Id,
                        Descricao = t.Descricao,
                        Valor = t.Valor,
                        Tipo = t.Tipo,
                        PessoaId = t.PessoaId
                    })
                    .ToList()
            })
            .ToListAsync();
    }


    // Busca uma pessoa pelo identificador.
    public async Task<PessoaResponseDTO?> BuscarPorIdAsync(int id)
    {
        return await _context.Pessoas
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new PessoaResponseDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade,

                Transacoes = p.Transacoes
                    .Select(t => new TransacaoResponseDTO
                    {
                        Id = t.Id,
                        Descricao = t.Descricao,
                        Valor = t.Valor,
                        Tipo = t.Tipo,
                        PessoaId = t.PessoaId
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();
    }


    // Cria uma nova pessoa.
    public async Task<Pessoa> CriarAsync(PessoaDTO dto)
    {
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        _context.Pessoas.Add(pessoa);

        await _context.SaveChangesAsync();

        return pessoa;
    }


    // Exclui uma pessoa.
    // As transações relacionadas são removidas pelo Cascade Delete.
    public async Task<bool> ExcluirAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return false;

        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();

        return true;
    }
}