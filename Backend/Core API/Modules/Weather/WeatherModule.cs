namespace Agromind_Core_API.Modules.Weather;

public static class WeatherModule
{
    public static IServiceCollection AddWeatherModule(this IServiceCollection services)
    {
        // Register weather services here
        // services.AddScoped<IWeatherService, WeatherService>();

        return services;
    }
}
