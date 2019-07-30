using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace Invoro.Api.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
             .ConfigureLogging(loggerBuilder =>
             {
#if DEBUG
                 loggerBuilder.AddConsole();
                 loggerBuilder.AddDebug();
#endif
             })
             .UseStartup<Startup>()
             .UseKestrel();
    }
}
