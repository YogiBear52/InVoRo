using Invoro.Api.src.DataModel;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Invoro.Api.src.Services
{
    public class FeaturesService : IFeaturesService
    {
        public FeaturesService(IMongoService mongoService)
        {
            Features = mongoService.GetCollection<Feature>("Features");
        }

        public IMongoCollection<Feature> Features { get; }

        public IEnumerable<Feature> GetFeatures()
        {
            return this.Features.Find(new BsonDocument()).ToEnumerable<Feature>();
        }
    }

    public interface IFeaturesService
    {
        IEnumerable<Feature> GetFeatures();
    }
}
