using System.Runtime.CompilerServices;
using System.Text.Encodings.Web;
using dowload;

namespace busApi
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
        }

    }

}
