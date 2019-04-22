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
        [BsonRequired]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        [BsonRequired]
        public string Name { get; set; }

        [BsonElement("status")]
        [BsonRequired]
        [BsonSerializer(typeof(StatusBsonSeriazlier))]
        public Status Status { get; set; }

        [BsonElement("link")]
        public string Link { get; set; }

        [BsonElement("category")]
        [BsonRequired]
        public string CategoryName { get; set; }

        [BsonElement("creationTime")]
        [BsonRequired]
        [BsonDateTimeOptions(DateOnly =false,Kind =DateTimeKind.Utc,Representation =BsonType.DateTime)]
        public DateTime CreationTime { get; set; }

        [BsonElement("lastTimeModified")]
        [BsonRequired]
        [BsonDateTimeOptions(DateOnly = false, Kind = DateTimeKind.Utc, Representation = BsonType.DateTime)]
        public DateTime LastTimeModified { get; set; }
    }

    public class FeatureDtoResponse
    {
        [JsonProperty("id")]
        [JsonRequired]
        public string Id { get; set; }

        [JsonProperty("name")]
        [JsonRequired]
        public string Name { get; set; }

        [JsonProperty("status")]
        [JsonRequired]
        public string Status { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("categoryName")]
        [JsonRequired]
        public string CategoryName { get; set; }

        [JsonProperty("creationTime")]
        [JsonRequired]
        public DateTime CreationTime { get; set; }

        [JsonProperty("lastTimeModified")]
        [JsonRequired]
        public DateTime LastTimeModified { get; set; }
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
