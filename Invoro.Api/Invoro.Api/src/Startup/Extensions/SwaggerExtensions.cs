using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Invoro.Api.Startup.Extensions
{
    public static class SwaggerExtensions
    {
        public static void AddInvoroSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("Invoro", new Info { Title = "Invoro API", Version = "v1" });
            });
        }

        public static void UseInvoroSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(swaggerUI =>
            {
                swaggerUI.SwaggerEndpoint("/swagger/Invoro/swagger.json", "Invoro API");
            });
        }
    }
}
