using Microsoft.AspNetCore.Http;
using System.Threading;

namespace Invoro.Api.src.Services
{
    public class BaseService
    {
        protected CancellationToken RequestCancellationToken;

        public BaseService(IHttpContextAccessor httpContextAccessor)
        {
            this.RequestCancellationToken = httpContextAccessor.HttpContext.RequestAborted;
        }
    }
}
