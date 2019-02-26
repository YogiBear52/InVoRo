using MongoDB.Driver;

namespace Invoro.Api.src.Services
{
    public class MongoService : IMongoService
    {
        // TODO: From settings
        private static string mongoConnectionString = "mongodb://root:example@10.0.75.1:27017";
        private readonly MongoClient _MongoClient;

        public MongoService()
        {
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
