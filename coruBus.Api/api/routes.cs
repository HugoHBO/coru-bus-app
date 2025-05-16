using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using System.Threading.Tasks;

namespace busApi
{

    public static class Routes
    {



        public static void ConfigureRoutes(this WebApplication app)
        {
            // Ruta para obtener todas las líneas de buses
            app.MapGet("/lin", () =>
            {
                return Results.Ok(new { message = "Aquí van las líneas de buses" });
            });

            // Aquí puedes agregar más rutas según sea necesario, como /paradas, /linea/{id}, etc.
            app.MapGet("/paradas", () =>
            {
                return Results.Ok(new { message = "Aquí van las paradas de buses" });
            });

            app.MapGet("/linea/{id}", (int id) =>
            {
                return Results.Ok(new { message = $"Detalles de la línea {id}" });
            });

            app.MapGet("/getLineas", async ([FromServices] HttpClient httpClient) =>
                {
                    try
                    {
                        var lineas = await coruBus.Api.api.lineas.getLineas.ObtenerLineas(httpClient);
                        if (lineas == null) return Results.NotFound();

                        string jsonString = lineas.ToString(Newtonsoft.Json.Formatting.None);

                        // Devolver raw JSON como contenido con tipo application/json
                        return Results.Content(jsonString, "application/json");
                    }
                    catch (Exception ex)
                    {
                        return Results.Problem(ex.Message);
                    }
                });

        }

    }

}
