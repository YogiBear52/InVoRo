using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Invoro.Api.src.Services
{
    public class MongoService : IMongoService
    {
        protected readonly MongoClient _MongoClient;
        private readonly string _DbName;

        public MongoService(IConfiguration configuration)
        {
            string mongoConnectionString = configuration.GetConnectionString("InvoroMongo");

            MongoClientSettings settings = GetMongoClientSettings(mongoConnectionString);
            
            _MongoClient = new MongoClient(settings);

            _DbName = GetDataBaseName(mongoConnectionString);
        }

        private string GetDataBaseName(string mongoConnectionString)
        {
            string databaseName = MongoUrl.Create(mongoConnectionString).DatabaseName;

            if (string.IsNullOrWhiteSpace(databaseName))
            {
                throw new ArgumentException("Mongo connection string doesn't contain DatabaseName");
            }

            return databaseName;
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
