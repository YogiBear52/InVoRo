using Microsoft.AspNetCore.Http;
using System.Threading;

namespace Invoro.Api.src.Services
{
    public class BaseService
    {
        protected CancellationToken ServiceCancellationToken;

        public BaseService(IHttpContextAccessor httpContextAccessor)
        {
            this.ServiceCancellationToken = httpContextAccessor.HttpContext.RequestAborted;
        }
    }
}
