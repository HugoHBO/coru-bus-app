using busApi;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

var app = builder.Build(); 

// endpoints 
app.ConfigureRoutes();

// ejecutando api
app.Run();