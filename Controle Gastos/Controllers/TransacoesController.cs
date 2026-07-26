using ControleGastos.DTOs;
using ControleGastos.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service;

    public TransacoesController(TransacaoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _service.ListarAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Criar(TransacaoDTO dto)
    {
        var resultado = await _service.CriarAsync(dto);

        if (!resultado.Sucesso)
            return BadRequest(resultado.Mensagem);

        return Ok(resultado.Mensagem);
    }
}