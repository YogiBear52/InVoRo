using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Invoro.Api.src.DataModel
{
    public class Feature
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }
    }

    public class FeatureDtoResponse
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("namee")]
        public string Name { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }


    public class FeatureProfileMapping : Profile
    {
        public FeatureProfileMapping()
        {
            CreateMap<Feature, FeatureDtoResponse>().
                ForMember(dest => dest.Id, source => source.MapFrom((_) => _.Id.ToString()));
        }
    }
}
