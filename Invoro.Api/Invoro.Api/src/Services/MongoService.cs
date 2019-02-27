using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Invoro.Api.src.Services
{
    public class MongoService : IMongoService
    {
        protected readonly MongoClient _MongoClient;

        public MongoService(IConfiguration configuration)
        {
            MongoClientSettings settings = GetMongoClientSettings(configuration);

            _MongoClient = new MongoClient(settings);
        }

        public IMongoCollection<TDocumnet> GetCollection<TDocumnet>(string name)
        {
            return GetDatabase().GetCollection<TDocumnet>(name);
        }

        #region Protected Methods

        protected IMongoDatabase GetDatabase()
        {
            return _MongoClient.GetDatabase("Invoro");
        }

        #endregion

        #region Private Methods

        private static MongoClientSettings GetMongoClientSettings(IConfiguration configuration)
        {
            string mongoConnectionString = configuration.GetConnectionString("InvoroMongo");
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
