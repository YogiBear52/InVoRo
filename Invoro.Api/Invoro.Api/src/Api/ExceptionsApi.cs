using Invoro.Api.src.DataModel;
using System;

namespace Invoro.Api.src.Api
{
    /// <summary>
    /// Api is very important to be consistent stable and in our full control.
    /// Exceptions and error messages too. We have to control exactly what our clients gets.
    /// This class will gather all the API Exceptions that are thrown to the client.
    /// </summary>
    public static class ExceptionsApi
    {
        #region Authentication

        public static Exception AuthenticationHeaderIsEmptyException(string AuthenticationHeaderName)
        {
            return new InvalidOperationException(
                $"For authentication purposes, Invoro service is expecting to get the user identifier from the '{AuthenticationHeaderName}' Http Header.");
        }

        #endregion

        #region DataBase

        public static Exception MongoConnectionStringIsNotConfiguredException(string mongoConnectionStringConfigKey)
        {
            return new ArgumentException($"Mongo connection string '{mongoConnectionStringConfigKey}' is not set in configuration");
        }

        public static Exception MongoConnectionStringDoesntContainDataBaseNameException()
        {
            return new ArgumentException("Mongo connection string doesn't contain DatabaseName");
        }

        public static Exception FailedToDeseraizleStatusFromMongoException(string statusAsString, Exception innerExceptiom)
        {
            return new Exception($"Failed while trying to Deseriazlie '{statusAsString}' from mongo to a 'Status' object", innerExceptiom);
        }

        #endregion

        #region Status

        public static Exception FailedToParseStatusFromStringToObjectException(string statusString)
        {
            return new ArgumentException(
                $"Cannot convert Status field with the string value of '{statusString}'" +
                $" because it doesn't match one of the options: '{String.Join(", ", Enum.GetNames(typeof(Status)))}'");
        }

        public static Exception StatusStringCannotBeEmptyException()
        {
            return new ArgumentNullException("Status string cannot be null or empty");
        }

        #endregion

        #region Api

        public static Exception VotedFeatureDoesntExistException()
        {
            string message = "The feature you are trying to vote for, doesn't exist";
            return new ArgumentException(message);
        }

        public static Exception UnvotedFeatureDoesntExistException()
        {
            string message = "The feature you are trying to unvote for, doesn't exist";
            return new ArgumentException(message);
        }

        #endregion
    }
}
