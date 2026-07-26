using System.Net;
using System.Text.Json;

namespace ControleGastos.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;


    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }


    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro Desconhecido.");

            await HandleExceptionAsync(context, ex);
        }
    }


    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ErrorResponse
        {
            Sucesso = false,
            Mensagem = "Ocorreu um erro interno.",
            Detalhe = exception.Message
        };


        switch (exception)
        {
            case KeyNotFoundException:

                context.Response.StatusCode = 
                    StatusCodes.Status404NotFound;

                response = new ErrorResponse
                {
                    Sucesso = false,
                    Mensagem = exception.Message
                };

                break;


            case ArgumentException:

                context.Response.StatusCode =
                    StatusCodes.Status400BadRequest;

                response = new ErrorResponse
                {
                    Sucesso = false,
                    Mensagem = exception.Message
                };

                break;
        }


        var json = JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(json);
    }
}