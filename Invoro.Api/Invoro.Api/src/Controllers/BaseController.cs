using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Invoro.Api.src.Controllers
{
    [ApiController]
    [EnableCors]
    [Route("api/[controller]")]
    public abstract class BaseController : ControllerBase
    {
        public BaseController(IMapper mapper)
        {
            Mapper = mapper;
        }

        public IMapper Mapper { get; }
    }
}