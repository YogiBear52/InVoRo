using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Invoro.Api.src.DataModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Invoro.Api.src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAnyOrigin")]
    public class FeaturesController : ControllerBase
    {
        private static string mongoConnectionString = "mongodb://root:example@10.0.75.1:27017";
        private MongoClient _mongoClient;

        private IMapper _mapper;

        public FeaturesController(IMapper mapper)
        {
            _mongoClient = new MongoClient(mongoConnectionString);
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetFeatures()
        {
            var db = _mongoClient.GetDatabase("Yogevs");
            var collection = db.GetCollection<Feature>("Features");

           Feature[] featuresFromMongo =
                collection.Find(new BsonDocument()).ToList().ToArray();

            FeatureDtoResponse[] response =
                _mapper.Map<FeatureDtoResponse[]>(featuresFromMongo);

            return this.Ok(response);
        }
    }
}