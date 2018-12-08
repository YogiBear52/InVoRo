using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public FeaturesController()
        {
            _mongoClient = new MongoClient(mongoConnectionString);
        }

        [HttpGet]
        public Feature[] GetFeatures()
        {
            var db = _mongoClient.GetDatabase("Yogevs");
            var collection = db.GetCollection<Feature>("Features");

           Feature[] featuresFromMongo =
                collection.Find(new BsonDocument()).ToList().ToArray();
            //return featuresFromMongo;
            return new Feature[]
            {
                new Feature()
                {
                    Name  = "Connect to Mongo1",
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