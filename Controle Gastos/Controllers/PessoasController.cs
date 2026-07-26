using ControleGastos.DTOs;
using ControleGastos.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly PessoaService _service;

    public PessoasController(PessoaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _service.ListarAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Criar(PessoaDTO dto)
    {
        var pessoa = await _service.CriarAsync(dto);

        return CreatedAtAction(nameof(Listar),
            new { id = pessoa.Id }, pessoa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var removido = await _service.ExcluirAsync(id);

        if (!removido)
            return NotFound("Pessoa não encontrada.");

        return NoContent();
    }
}