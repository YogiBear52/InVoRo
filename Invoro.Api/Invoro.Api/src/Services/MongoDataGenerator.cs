using Invoro.Api.src.DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Invoro.Api.src.Services
{
    /// <summary>
    /// On startup, Initialzie the mongo with the given data.
    /// This class will be removed after developing Admins could insert the data by themselfs.
    /// </summary>
    public class MongoDataSeeder : MongoService, IHostedService
    {
        #region Consts

        private static readonly string ENABLE_DB_GENERATOR_BOOLEAN_CONFIG_KEY = "EnableDBDataGenerationOnStart";

        #endregion

        #region Fields

        private readonly bool _EnableDBDataGenerator;
        private readonly ILogger _Logger;

        #endregion

        public MongoDataSeeder(IConfiguration configuration, ILoggerFactory loggerFactory)
            : base(configuration)
        {
            _EnableDBDataGenerator =
                configuration.GetSection(MONGO_CONFIG_SECTION_KEY).GetValue<bool>(ENABLE_DB_GENERATOR_BOOLEAN_CONFIG_KEY);
            _Logger = loggerFactory.CreateLogger(nameof(MongoDataSeeder));

            string enableStr = (_EnableDBDataGenerator == true) ? "true" : "false";
            _Logger.LogInformation($"DBDataGenerator is {enableStr}");
        }

        #region Public Methods

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                if (!_EnableDBDataGenerator)
                {
                    return;
                }

                await ValidateDbEmptyOfCollections(cancellationToken);

                await LoadCollectionsFromFiles(cancellationToken);
            }
            catch(Exception exception)
            {
                _Logger.LogError($"Mongo DB Generator (MongoSeed) - failed to execute. {Environment.NewLine}{exception.Message}",exception);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        #endregion

        #region Private Methods

        private async Task ValidateDbEmptyOfCollections(CancellationToken cancellationToken)
        {
            IMongoDatabase InvoroDataBase = GetDatabase();
            List<string> collectionNames = await InvoroDataBase.ListCollectionNames().ToListAsync(cancellationToken);

            if (collectionNames.Any())
            {
                throw new Exception($"DB is not empty. You need to drop the following collections to load the new ones. {string.Join(',', collectionNames)}");
            }
        }

        private async Task LoadCollectionsFromFiles(CancellationToken cancellationToken)
        {
            const string CollectionsFolderName = "CollectionsToLoad";
            if (!Directory.Exists(CollectionsFolderName))
            {
                throw new Exception($"The folder in which the collection to load to mongo doesn't exist. Path:'{Path.Combine(Directory.GetCurrentDirectory(), CollectionsFolderName)}'");
            }

            string[] filesInFolder = Directory.GetFiles(CollectionsFolderName);
            ValidateAllFilesInJsonFormat(filesInFolder);

            // Features
            string featuresExpectedFileName = "Features.json";
            string featuresCollectionName = "Features";

            string featureFileName = GetExisingFileFromDirectory(featuresExpectedFileName, filesInFolder);

            await LoadDataFromFilesToMongoCollection<Feature>(featureFileName, featuresCollectionName, cancellationToken);
        }

        private async Task GenerateCollection<TCollection>(string collectionName, IEnumerable<TCollection> collectionData, CancellationToken cancellationToken)
        {
            IMongoDatabase InvoroDataBase = GetDatabase();
            List<string> collectionNames = await InvoroDataBase.ListCollectionNames().ToListAsync(cancellationToken);

            if (collectionNames.Contains(collectionName)) { return; }

            await InvoroDataBase.CreateCollectionAsync(collectionName, cancellationToken: cancellationToken);
            await InvoroDataBase.GetCollection<TCollection>(collectionName).InsertManyAsync(collectionData, cancellationToken: cancellationToken);
        }

        private async Task LoadDataFromFilesToMongoCollection<T>(string featureFileName, string featuresCollectionName, CancellationToken cancellationToken)
        {
            T[] fileCollectionData = GetDataFromFiles<T>(featureFileName);

            await this.GenerateCollection(featuresCollectionName, fileCollectionData, cancellationToken);
        }

        private string GetExisingFileFromDirectory(string featuresExpectedFileName, string[] filesPathInFolder)
        {
            string[] featuesFilesName = filesPathInFolder.Where(fileName => Path.GetFileName(fileName) == featuresExpectedFileName).ToArray();
            if (!featuesFilesName.Any())
            {
                throw new Exception($"File with name '{featuresExpectedFileName}' doesn't exist.");
            }
            else if (featuesFilesName.Length > 1)
            {
                throw new Exception($"More than one file with name '{featuresExpectedFileName}' exists.");
            }

            string featureFileName = featuesFilesName.SingleOrDefault();

            return featureFileName;
        }

        private T[] GetDataFromFiles<T>(string filePath)
        {
            var serializer = new JsonSerializer();

            try
            {
                using (TextReader reader = new StreamReader(filePath))
                {
                    using (JsonTextReader jsonReader = new JsonTextReader(reader))
                    {
                        T[] array = serializer.Deserialize<T[]>(jsonReader);

                        return array;
                    }
                }
            }
            catch (Exception exception)
            {
                throw new Exception($"Failed while loading file '{filePath}'", exception);
            }
        }

        private void ValidateAllFilesInJsonFormat(string[] filesToLoad)
        {
            string[] notJsonFiles = filesToLoad.Where(fileName => fileName.EndsWith(".json")).ToArray();
            if (filesToLoad.Length > notJsonFiles.Length)
            {
                throw new Exception($"All files to load must be .json files.{string.Join(',', notJsonFiles)}");
            }
        }

        #endregion
    }
}
