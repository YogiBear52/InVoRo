using Invoro.Api.src.Api;
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
                throw ExceptionsApi.StatusStringCannotBeEmptyException();
            }

            Status status;
            if (!Enum.TryParse<Status>(statusString, out status))
            {
                throw ExceptionsApi.FailedToParseStatusFromStringToObjectException(statusString);
            }

            return status;
        }

        public static string ConvertStatusToString(Status status)
        {
            return Enum.GetName(typeof(Status), status);
        }
    }
}
