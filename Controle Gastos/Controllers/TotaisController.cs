using ControleGastos.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly TotalService _service;

    public TotaisController(TotalService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Consultar()
    {
        return Ok(await _service.CalcularAsync());
    }
}