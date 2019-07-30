using Invoro.Api.src.Authentication;
using Invoro.Api.src.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Invoro.Api.Startup
{
    public class DependecyInjectionServicesRegistrator
    {
        public static void AddInvoroServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<IFeaturesService, FeaturesService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddSingleton<IMongoService, MongoService>();
            services.AddLogging();

            services.AddHostedService<MongoDataSeeder>();
        }
    }

    public static class DependencyInjectionExtensions
    {
        public static void AddInvoroSpecificServices(this IServiceCollection services)
        {
            DependecyInjectionServicesRegistrator.AddInvoroServices(services);
        }
    }
}
