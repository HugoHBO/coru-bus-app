using busApi;

var builder = WebApplication.CreateBuilder(args);

// servicios 
builder.Services.AddHttpClient();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// endpoints 
app.ConfigureRoutes();
app.UseCors("AllowAngularDev");

app.Run();