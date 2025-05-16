using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace coruBus.Api.api.lineas
{
    public static class getLineas
    {

        public static async Task<JArray?> ObtenerLineas(HttpClient httpClient)
        {   
            string url = "https://itranvias.com/queryitr_v3.php?func=7&dato=20160101T000000_gl_0_20160101T000000";
            try
            {   
                string json = await httpClient.GetStringAsync(url);
                var obj = JObject.Parse(json);  

                var actualizacion = obj["iTranvias"]?["actualizacion"] as JObject;
                Console.WriteLine($"Tipo de actualizacion: {actualizacion?.GetType()}"); 

                JArray? lineas = actualizacion["lineas"] as JArray; 
                Console.WriteLine(lineas);

                return lineas;
            }
            catch (Exception ex)
            {
                // Si hay un error, lanzar la excepción
                throw new Exception("Error al obtener las líneas", ex);
            }
        }

    }
}
      





/* json_lineas ->
Generar un JSON con todas las líneas. (id, nombre, origen, destino, color) */

// ---------------------------------------
/* json_paradas ->
Generar un JSON con todas las paradas. (id, nombre, propiedades: [
pavimento, banco, marquesina, papelera, iluminada], líneas: [id, nombre,
color], coordenadas, coordenadas de OSM) */ 


// ---------------------------------------
/* json_rutas ->
Generar un JSON con las paradas por las que pasa cada línea*/


// ---------------------------------------
/* geoson ->
Generar un GeoJSON con todas las paradas y un diálogo que enlaza a la
parada y a las líneas que pasan por la parada */



// --------------------------------------- 
/* datos_oms -> 
Descarga los datos de OSM a través de overpass y los guarda en un archivo GeoJSON */
