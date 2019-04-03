using Microsoft.Extensions.DependencyInjection;

namespace Invoro.Api.Startup.Extensions
{
    public static class CorsExtensions
    {
        public static void AddInvoroCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
        }
    }
}
