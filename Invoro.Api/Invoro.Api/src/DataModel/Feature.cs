using AutoMapper;
using Invoro.Api.src.DataModel.MongoCustomeSerializers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

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
        [BsonSerializer(typeof(StatusBsonSeriazlier))]
        public Status Status { get; set; }
    }

    public class FeatureDtoResponse
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }

    public class FeatureProfileMapping : Profile
    {
        public FeatureProfileMapping()
        {
            CreateMap<Feature, FeatureDtoResponse>()
                .ForMember(dest => dest.Id, source => source.MapFrom((_) => _.Id.ToString()))
                .ForMember(dest => dest.Status, source => source.MapFrom(_ => Enum.GetName(typeof(Status), _.Status)));
        }
    }
}
