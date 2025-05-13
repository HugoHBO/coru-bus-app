using busApi;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build(); 

// redirección https , por si se llaga usar.
app.UseHttpsRedirection();

// endpoints 
app.ConfigureRoutes();

// ejecutando api
app.Run();