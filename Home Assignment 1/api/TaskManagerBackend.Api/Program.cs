using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS to allow requests from React Vite dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDevServer",
        policy => policy.WithOrigins("http://localhost:5173") // React app URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactDevServer");

// Map controllers
app.MapControllers();

app.Run();
