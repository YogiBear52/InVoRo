using AutoMapper;
using Invoro.Api.Startup.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Invoro.Api.Startup
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddInvoroResponseCompression();
            services.AddInvoroCors();
            services.AddInvoroSwagger();
            services.AddAutoMapper();
            services.AddMvc();
            services.AddInvoroSpecificServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseInvoroResposeCompression();

            app.UseMvc();

            app.UseInvoroSwagger();
        }
    }
}
