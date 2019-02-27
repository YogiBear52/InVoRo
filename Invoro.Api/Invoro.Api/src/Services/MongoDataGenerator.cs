using Invoro.Api.src.DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Invoro.Api.src.Services
{
    /// <summary>
    /// Background service on start
    /// </summary>
    public class MongoDataGenerator : MongoService, IHostedService
    {
        private readonly bool _EnableDBDataGenerator;

        public MongoDataGenerator(IConfiguration configuration)
            :base(configuration)
        {
            _EnableDBDataGenerator =
                configuration.GetSection("Mongo").GetValue<bool>("EnableDBDataGenerationOnStart");
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            if (!_EnableDBDataGenerator)
            {
                return;
            }

            await GenerateDB(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public async Task GenerateDB(CancellationToken cancellationToken)
        {
            string collectionName = "Features";
            Feature[] collectionData = new Feature[]
            {
                new Feature
                {
                    Id = ObjectId.GenerateNewId(),
                    Name = "Asp.net Core service best practices",
                    Status ="Done"
                },
                new Feature
                {
                    Id = ObjectId.GenerateNewId(),
                    Name = "Server - First request",
                    Status ="In Progress"
                },
                new Feature
                {
                    Id = ObjectId.GenerateNewId(),
                    Name = "Client side - replace to react",
                    Status ="Planned"
                }
            };

            await GenerateCollection(collectionName, collectionData,cancellationToken);
        }

        private async Task GenerateCollection<TCollection>(string collectionName, IEnumerable<TCollection> collectionData, CancellationToken cancellationToken)
        {
            IMongoDatabase InvoroDataBase = GetDatabase();
            List<string> collectionNames = await InvoroDataBase.ListCollectionNames().ToListAsync(cancellationToken);

            if (collectionNames.Contains(collectionName)) { return; }

            await InvoroDataBase.CreateCollectionAsync(collectionName, cancellationToken: cancellationToken);
            await InvoroDataBase.GetCollection<TCollection>(collectionName).InsertManyAsync(collectionData, cancellationToken: cancellationToken);
        }
    }
}
