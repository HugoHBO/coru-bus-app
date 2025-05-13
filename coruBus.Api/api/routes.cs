using Microsoft.AspNetCore.Builder; 
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace busApi 
{

public static class Routes 
{   
    private static readonly Dictionary<string, string> rutas = new()
    {
        { "osm", "bus/datos/osm.json" },
        { "translate", "bus/datos/translate.json" },
        { "paradas", "bus/datos/paradas.json" },
        { "lineas", "bus/datos/lineas.json" },
        { "geojson", "bus/static/paradas.geojson.js" },
        { "rutas", "bus/datos/rutas.json" },
        { "queryitr", "bus/datos/queryitr_v3.json" }
    };

    // URL para actualizar
    private const string url = "https://itranvias.com/queryitr_v3.php?func=7&dato=20160101T000000_gl_0_20160101T000000";

    // Ejecutar la actualización al iniciar
    // private static readonly (object jlineas, object jparadas, object jrutas) = 
    // Actualizar(url, rutas);

     public static void ConfigureRoutes(this WebApplication app)
    {  
        // Ruta para obtener todas las líneas de buses
        app.MapGet("/lineas", () =>
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

        // Y más rutas aquí...
    }

}

}
