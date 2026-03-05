using Agromind_Core_API.Common.Extensions;
using Agromind_Core_API.Common.Middleware;
using Agromind_Core_API.Modules.Agriculture;
using Agromind_Core_API.Modules.Aquaculture;
using Agromind_Core_API.Modules.Auth;
using Agromind_Core_API.Modules.Energy;
using Agromind_Core_API.Modules.LLM;
using Agromind_Core_API.Modules.Weather;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.UseSerilog((context, config) =>
    config.ReadFrom.Configuration(context.Configuration));

// ── Common Services ──────────────────────────────────────
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddSwaggerServices();
builder.Services.AddCorsPolicy();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(Program));

// ── Feature Modules ──────────────────────────────────────
builder.Services.AddAuthModule(builder.Configuration);
builder.Services.AddAquacultureModule();
builder.Services.AddAgricultureModule();
builder.Services.AddWeatherModule();
builder.Services.AddEnergyModule();
builder.Services.AddLLMModule();

var app = builder.Build();

// ── Middleware Pipeline ──────────────────────────────────
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
