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


namespace dowload
{
    public static class Data
    {

        public static async Task<IResult> getLineas(HttpClient httpClient)
        {
            string url = "https://itranvias.com/queryitr_v3.php?func=7&dato=20160101T000000_gl_0_20160101T000000";
            try
            {
                string response = await httpClient.GetStringAsync(url);
                JObject jsonObj = JObject.Parse(response);

                var lineasToken = jsonObj["iTranvias"]?["actualizacion"]?["lineas"];

                if (lineasToken == null || !lineasToken.HasValues)
                {
                    return Results.NotFound("No se encontró la sección 'lineas'");
                }

                string responseJson = lineasToken.ToString(Newtonsoft.Json.Formatting.None);
                return Results.Content(responseJson, "application/json");
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las líneas", ex);
            }
        }

        public static async Task<IResult> GetParadas(HttpClient httpClient)
        {
            string url = "https://itranvias.com/queryitr_v3.php?func=7&dato=20160101T000000_gl_0_20160101T000000";

            try
            {
                var response = await httpClient.GetStringAsync(url);
                // var root = JsonSerializer.Deserialize<RootObject>(json);
                // var soloParadas = new { paradas = root?.iTranvias?.actualizacion?.paradas };

                JObject jsonObj = JObject.Parse(response);
                var paradasToken = jsonObj["iTranvias"]?["actualizacion"]?["paradas"];
                if (paradasToken == null || !paradasToken.HasValues)
                {
                    return Results.NotFound("No se encontró la sección 'lineas'");
                }
                ;
                string responseJson = paradasToken.ToString(Newtonsoft.Json.Formatting.None);
                return Results.Content(responseJson, "application/json");
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las líneas", ex);
            }

        }

        public static async Task<IResult> ObtenerBusesParada(HttpClient httpClient, int idParada)
        {
            try
            {
                string baseUrl = $"https://itranvias.com/queryitr_v3.php?dato={idParada}&func=0";
                long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                string fullUrl = $"{baseUrl}&_={timestamp}";
                string response = await httpClient.GetStringAsync(fullUrl);
                string? responseJson = JObject.Parse(response)["buses"]?.ToString(Newtonsoft.Json.Formatting.None);
                if (string.IsNullOrEmpty(responseJson))
                {
                    return Results.NotFound(" No se encontró la sección 'buses");
                }
                return Results.Content(responseJson, "application/json");

            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las líneas", ex);
            }
        }
    }
}
