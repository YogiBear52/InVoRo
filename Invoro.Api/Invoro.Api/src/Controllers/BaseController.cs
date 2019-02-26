using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Invoro.Api.src.Controllers
{
    [ApiController]
    //[EnableCors("AllowAnyOrigin")] Not sure if needed. Check when Client is ready
    public abstract class BaseController : ControllerBase
    {
        public BaseController(IMapper mapper)
        {
            Mapper = mapper;
        }

        public IMapper Mapper { get; }
    }
}