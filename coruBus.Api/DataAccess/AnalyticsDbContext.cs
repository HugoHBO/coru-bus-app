using Microsoft.EntityFrameworkCore;
using Corubus.DataAccess.Models;

namespace Corubus.DataAccess
{
    public class AnalyticsDbContext : DbContext
    {   
        // Tabla de paradas
        public DbSet<Parada> Paradas { get; set; }  

        // constructor 
        public AnalyticsDbContext(DbContextOptions<AnalyticsDbContext> options)
            : base(options)
        {
        }
    }
}