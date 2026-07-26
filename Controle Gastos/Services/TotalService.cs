using ControleGastos.Data;
using ControleGastos.DTOs;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services;

/// <summary>
/// Serviço responsável pelo cálculo dos totais financeiros.
/// Calcula receitas, despesas e saldo de cada pessoa.
/// </summary>
public class TotalService
{
    private readonly AppDbContext _context;

    public TotalService(AppDbContext context)
    {
        _context = context;
    }


    public async Task<object> CalcularAsync()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .AsNoTracking()
            .ToListAsync();


        var resultado = pessoas.Select(p => new
        {
            Pessoa = p.Nome,

            Receitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),

            Despesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor)
        })
        .Select(x => new
        {
            x.Pessoa,
            x.Receitas,
            x.Despesas,

            Saldo = x.Receitas - x.Despesas
        })
        .ToList();


        return new
        {
            Pessoas = resultado,

            TotalReceitas = resultado.Sum(x => x.Receitas),

            TotalDespesas = resultado.Sum(x => x.Despesas),

            SaldoLiquido = resultado.Sum(x => x.Saldo)
        };
    }
}