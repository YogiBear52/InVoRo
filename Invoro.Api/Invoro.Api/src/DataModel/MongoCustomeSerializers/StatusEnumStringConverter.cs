using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoro.Api.src.DataModel.MongoCustomeSerializers
{
    public static class StatusEnumStringConverter
    {
        public static Status ConvertStringToStatus(string statusString)
        {
            if (string.IsNullOrWhiteSpace(statusString))
            {
                throw new ArgumentNullException("String cannot be null or empty", nameof(statusString));
            }

            Status status;
            if (!Enum.TryParse<Status>(statusString, out status))
            {
                throw new ArgumentException(
                    $"Cannot convert Status field with the string value of '{statusString}'" +
                    $" because it doesn't match one of the options: '{String.Join(", ", Enum.GetNames(typeof(Status)))}'");
            }

            return status;
        }

        public static string ConvertStatusToString(Status status)
        {
            return Enum.GetName(typeof(Status), status);
        }
    }
}
