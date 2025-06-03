using System.Runtime.CompilerServices;
using System.Text.Encodings.Web;
using Corubus.Api.Dtos;
using Corubus.Api.Dowload;
using Corubus.DataAccess.Services;

namespace Corubus.Api.Routes
{

    public static class Routes
    {

        public static void ConfigureRoutes(this WebApplication app)
        {

            /* Informacion de las lienas */
            app.MapGet("api/getLineas", async (HttpClient httpClient) =>
            {
                return await Data.getLineas(httpClient);
            });

            /* Información una liena concreta (tiempo, distancia ...) */
            app.MapPost("api/getBusesParada", async (HttpRequest request, HttpClient httpClient) =>
            {
                try
                {
                    using StreamReader reader = new StreamReader(request.Body);
                    string body = await reader.ReadToEndAsync();

                    if (!int.TryParse(body, out int idParada))
                    {
                        return Results.BadRequest($"El valor recibido no es un número válido. Recibido: {idParada} ");
                    }

                    return await Data.ObtenerBusesParada(httpClient, idParada);

                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            });

            /* Información de todas las paradas */
            app.MapGet("api/getParadas", async (HttpClient httpClient) =>
                {
                    try
                    {
                        return await Data.GetParadas(httpClient);
                    }
                    catch (Exception ex)
                    {
                        return Results.Problem(ex.Message);
                    }
                });


            /* Datos de analiticas */
            app.MapPost("api/sendParadasData", async (ParadasRequest request, AnalyticsService analyticsService) =>
            {
                if (request.Paradas == null || request.Paradas.Count == 0)
                {
                    return Results.BadRequest("No se han recibido paradas.");
                }

                await analyticsService.ProcesarParadasAsync(request);
                return Results.Ok();
            });

            /* Datos Top 3 paradas más clickeadas */ 
            app.MapGet("api/getTopParadas", async(AnalyticsService analyticsService) => {
                var topParadas = await analyticsService.getTopParadas();
                return Results.Ok(topParadas);
            });


        }

    }

}
