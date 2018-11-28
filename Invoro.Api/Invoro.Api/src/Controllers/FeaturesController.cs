using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Invoro.Api.src.DataModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Invoro.Api.src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAnyOrigin")]
    public class FeaturesController : ControllerBase
    {
        [HttpGet]
        public Feature[] GetFeatures()
        {
            return new Feature[]
            {
                new Feature()
                {
                    Name  = "Connect to Mongo",
                    Status = "Planned"
                },
                new Feature()
                {
                    Name = "Run server on docker",
                    Status = "Not Planned Yet"
                }
            };
        }
    }
}