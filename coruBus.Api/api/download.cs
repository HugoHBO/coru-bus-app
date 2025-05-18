using System;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Newtonsoft.Json.Linq;

/* Ruta Buses - Parada 

Se le pasa -> número de parada : devuelve  -> buses para esa parada y tiempo etc // se le puede pasar : 1747432461571 ms, 

Código que genera un timestamp -> 
string baseUrl = https://itranvias.com/queryitr_v3.php?&dato=523&func=0";
long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
string fullUrl = $"{baseUrl}&_={timestamp}";

Rutas sin timestamp ->
https://itranvias.com/queryitr_v3.php?&dato=523&func=0
*/


namespace coruBus.Api.api.lineas
{
    public static class getLineas
    {

        public static async Task<string> getAllLineas(HttpClient httpClient)
        {
            string url = "https://itranvias.com/queryitr_v3.php?func=7&dato=20160101T000000_gl_0_20160101T000000";
            try
            {
                string json = await httpClient.GetStringAsync(url);

                using var doc = JsonDocument.Parse(json);
                var lineasArray = doc.RootElement
                    .GetProperty("iTranvias")
                    .GetProperty("actualizacion")
                    .GetProperty("lineas");

                var listaReducida = new List<object>();

                foreach (var linea in lineasArray.EnumerateArray())
                {
                    var objReducido = new
                    {
                        Id = linea.GetProperty("id").GetInt32(),
                        Lin_comer = linea.GetProperty("lin_comer").GetString(),
                        Nombre_orig = linea.GetProperty("nombre_orig").GetString(),
                        Nombre_dest = linea.GetProperty("nombre_dest").GetString(),
                        Color = linea.GetProperty("color").GetString()
                    };
                    listaReducida.Add(objReducido);
                }

                string jsonReducido = JsonSerializer.Serialize(listaReducida, new JsonSerializerOptions
                {
                    WriteIndented = true
                });

                return jsonReducido;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las líneas", ex);
            }
        }
       

        public static async Task<JObject?> ObtenerBusesParada(HttpClient httpClient)
        {
            try
            {
                string baseUrl = "https://itranvias.com/queryitr_v3.php?dato=523&func=0";
                long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                string fullUrl = $"{baseUrl}&_={timestamp}";
                Console.WriteLine(fullUrl);

                string json = await httpClient.GetStringAsync(fullUrl);
                Console.WriteLine(json);

                var obj = JObject.Parse(json);
                Console.WriteLine(obj);

                return obj;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las líneas", ex);
            }
        }

    }
}
