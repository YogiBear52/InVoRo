using Invoro.Api.src.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Invoro.Api.Startup
{
    public class DependecyInjectionServicesRegistrator
    {
        public static void AddInvoroSpecificServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<IFeaturesService, FeaturesService>();
            services.AddSingleton<IMongoService, MongoService>();
            services.AddHostedService<MongoDataSimulator>();
        }
    }

    public static class DependencyInjectionExtensions
    {
        public static void AddInvoroSpecificServices(this IServiceCollection services)
        {
            DependecyInjectionServicesRegistrator.AddInvoroSpecificServices(services);
        }
    }
}
