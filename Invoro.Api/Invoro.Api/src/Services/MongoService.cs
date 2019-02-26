using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Invoro.Api.src.Services
{
    public class MongoService : IMongoService
    {
        private readonly MongoClient _MongoClient;

        public MongoService(IConfiguration configuration)
        {
            string mongoConnectionString = configuration.GetConnectionString("InvoroMongo");
            _MongoClient = new MongoClient(mongoConnectionString);
        }

        public IMongoCollection<TDocumnet> GetCollection<TDocumnet>(string name)
        {
            return GetDatabase().GetCollection<TDocumnet>(name);
        }

        #region Private Methods

        private IMongoDatabase GetDatabase()
        {
            return _MongoClient.GetDatabase("Invoro");
        }

        #endregion
    }

    public interface IMongoService
    {
        IMongoCollection<TDocumnet> GetCollection<TDocumnet>(string name);
    }
}
