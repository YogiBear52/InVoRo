using AutoMapper;
using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoro.Api.src.DataModel
{
    public class Feature
    {
        [JsonProperty("_id")]
        public ObjectId Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
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
            CreateMap<Feature, FeatureDtoResponse>().
                ForMember(dest => dest.Id, source => source.MapFrom((g) => g.Id.ToString()));
        }
    }
}
