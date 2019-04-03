using Invoro.Api.src.Api;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Invoro.Api.src.Services
{
    public class MongoService : IMongoService
    {
        private static readonly string MONGO_CONNECTION_STRING_CONFIG_KEY = "MongoConnectionString";

        private readonly string _DbName;

        protected readonly MongoClient _MongoClient;

        public MongoService(IConfiguration configuration)
        {
            string mongoConnectionString = configuration.GetConnectionString(MONGO_CONNECTION_STRING_CONFIG_KEY);

            if (string.IsNullOrWhiteSpace(mongoConnectionString))
            {
                throw ExceptionsApi.MongoConnectionStringIsNotConfiguredException(MONGO_CONNECTION_STRING_CONFIG_KEY);
            }

            MongoClientSettings settings = GetMongoClientSettings(mongoConnectionString);
            
            _MongoClient = new MongoClient(settings);

            _DbName = GetDataBaseName(mongoConnectionString);
        }

        public IMongoCollection<TDocumnet> GetCollection<TDocumnet>(string name)
        {
            return GetDatabase().GetCollection<TDocumnet>(name);
        }

        #region Protected Methods

        protected IMongoDatabase GetDatabase()
        {
            return _MongoClient.GetDatabase(_DbName);
        }

        #endregion

        #region Private Methods
        private string GetDataBaseName(string mongoConnectionString)
        {
            string databaseName = MongoUrl.Create(mongoConnectionString).DatabaseName;

            if (string.IsNullOrWhiteSpace(databaseName))
            {
                throw ExceptionsApi.MongoConnectionStringDoesntContainDataBaseNameException();
            }

            return databaseName;
        }

        private static MongoClientSettings GetMongoClientSettings(string mongoConnectionString)
        {
            MongoClientSettings settings = MongoClientSettings.FromConnectionString(mongoConnectionString);
            settings.WriteConcern = WriteConcern.Acknowledged.With(journal: true);

            return settings;
        }

        #endregion
    }

    public interface IMongoService
    {
        IMongoCollection<TDocumnet> GetCollection<TDocumnet>(string name);
    }
}
