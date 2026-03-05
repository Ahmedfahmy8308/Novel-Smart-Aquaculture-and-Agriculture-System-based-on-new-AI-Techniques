namespace Agromind_Core_API.Modules.Agriculture;

public static class AgricultureModule
{
    public static IServiceCollection AddAgricultureModule(this IServiceCollection services)
    {
        // Register agriculture services here
        // services.AddScoped<ICropService, CropService>();

        return services;
    }
}
