using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoro.Api.src.DataModel
{
    public class FeatureVote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public ObjectId Id { get; set; }

        [BsonElement("featureId")]
        [BsonRequired]
        public string FeatureId { get; set; }

        [BsonElement("userId")]
        [BsonRequired]
        public string UserId { get; set; }
    }
}
