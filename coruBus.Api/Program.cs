using Corubus.Api.Routes;
using Microsoft.EntityFrameworkCore;
using Corubus.DataAccess;
using Corubus.DataAccess.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://*:5234");

// servicios 
builder.Services.AddHttpClient();
builder.Services.AddCors(options =>
{
     options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registro de EF Core con SQLite
builder.Services.AddDbContext<AnalyticsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servicio BLL DataAccess
builder.Services.AddScoped<AnalyticsService>();

var app = builder.Build();

// middleware
app.UseCors("AllowAll");

app.ConfigureRoutes();

app.Run();