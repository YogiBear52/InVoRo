using MongoDB.Bson.Serialization;
using System;

namespace Invoro.Api.src.DataModel.MongoCustomeSerializers
{
    public class StatusBsonSeriazlier : IBsonSerializer<Status>
    {
        public Type ValueType => typeof(Status);

        // String to Enum
        public Status Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            string statusAsString = context.Reader.ReadString();

            Status status = StatusEnumStringConverter.ConvertStringToStatus(statusAsString);

            return status;
        }

        // Enum to string
        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, Status value)
        {
            string statusAsString = StatusEnumStringConverter.ConvertStatusToString(value);

            context.Writer.WriteString(statusAsString);
        }

        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
        {
            Status status = (Status)value;
            this.Serialize(context, args, status);
        }

        object IBsonSerializer.Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            return this.Deserialize(context, args);
        }
    }
}
