

namespace busApi
{

    public static class Routes
    {

        public static void ConfigureRoutes(this WebApplication app)
        {

            /* Informacion sobre linea concreta -> (paradas: IDA - VUELTA) */
            app.MapPost("api/paradas", async (HttpRequest request) =>
            {
                using var reader = new StreamReader(request.Body);
                var body = await reader.ReadToEndAsync();
                if (!int.TryParse(body, out int numero))
                {
                    return Results.BadRequest("El valor recibido no es un número entero");
                }

                return Results.Ok(new { mensaje = "Número recibido correctamente", numero });
            });



            /* Información sobre las lineas de una parada concreta */
            app.MapGet("api/getBusesParada", async (HttpClient httpClient) =>
            {
                try
                {
                    var busesData = await coruBus.Api.api.lineas.getLineas.ObtenerBusesParada(httpClient);
                    if (busesData == null) return Results.NotFound();
                    string jsonString = busesData.ToString(Newtonsoft.Json.Formatting.None);
                    // Devolver raw JSON como contenido con tipo application/json
                    return Results.Content(jsonString, "application/json");
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            });

            /* Información de todas las lineas de bus */
            app.MapGet("api/getLineas", async (HttpClient httpClient) =>
                {
                    try
                    {
                        var lineas = await coruBus.Api.api.lineas.getLineas.getAllLineas(httpClient);
                        if (string.IsNullOrEmpty(lineas))
                        {
                            return Results.NotFound();
                        }
                        return Results.Content(lineas, "application/json");
                    }
                    catch (Exception ex)
                    {
                        return Results.Problem(ex.Message);
                    }
                });

        }

    }

}
