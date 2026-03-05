namespace Agromind_Core_API.Modules.LLM;

public static class LLMModule
{
    public static IServiceCollection AddLLMModule(this IServiceCollection services)
    {
        // Register LLM/cognitive services here
        // services.AddHttpClient<ILLMService, LLMService>();

        return services;
    }
}
