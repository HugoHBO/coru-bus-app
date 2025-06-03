using Microsoft.EntityFrameworkCore;
using Corubus.Api.Dtos;
using Corubus.DataAccess.Models;
using Corubus.DataAccess;

namespace Corubus.DataAccess.Services
{
    /* Carga los datos de paradas en la db */
    public class AnalyticsService
    {
        private readonly AnalyticsDbContext _db;

        public AnalyticsService(AnalyticsDbContext db)
        {
            _db = db;
        }

        public async Task ProcesarParadasAsync(ParadasRequest request)
        {
            foreach (var paradaDto in request.Paradas)
            {
                var parada = await _db.Paradas.FindAsync(paradaDto.Id);
                if (parada != null)
                {
                    parada.Count += paradaDto.Count;
                }
                else
                {
                    _db.Paradas.Add(new Parada
                    {
                        Id = paradaDto.Id,
                        Count = paradaDto.Count
                    });
                }
            }

            await _db.SaveChangesAsync();
        }

        /* Selecciona el top 3 de paradas más con mas clicks  */
        public async Task<List<ParadaIdDTO>> getTopParadas()
        {
            return await _db.Paradas
                .OrderByDescending(p => p.Count)
                .Take(3)
                .Select(p => new ParadaIdDTO
                {
                    Id = p.Id
                })
                .ToListAsync();
        }


    }

}