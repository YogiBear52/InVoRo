using Invoro.Api.src.DataModel;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Invoro.Api.src.Api;
using MongoDB.Driver.Linq;

namespace Invoro.Api.src.Services
{
    public class FeaturesService : BaseService, IFeaturesService
    {
        public FeaturesService(IMongoService mongoService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            FeaturesCollection = mongoService.GetCollection<Feature>("Features");
            FeaturesVotesCollection = mongoService.GetCollection<FeatureVote>("FeaturesVotesCollection");
        }

        public IMongoCollection<Feature> FeaturesCollection { get; }

        public IMongoCollection<FeatureVote> FeaturesVotesCollection { get; }

        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return
                await this.FeaturesCollection
                    .Find(FilterDefinition<Feature>.Empty)
                    .ToListAsync(cancellationToken: base.RequestCancellationToken);
        }

        public async Task<IEnumerable<string>> GetVotedFeaturesByUser(string userId)
        {
            IMongoQueryable<string> result = this.FeaturesVotesCollection.AsQueryable<FeatureVote>().
                Where(featureVote => featureVote.UserId == userId).
                Select(feature => feature.FeatureId);

            return await result.ToListAsync();
        }

        public async Task VoteToFeature(string featureId, string userId)
        {
            if(!CheckIfFeatureExists(featureId))
            {
                throw ExceptionsApi.VotedFeatureDoesntExistException();
            }

            FeatureVote featureVote = new FeatureVote() { Id = new ObjectId(), FeatureId = featureId, UserId = userId };
            InsertOneOptions options = new InsertOneOptions() { BypassDocumentValidation = false };
            await this.FeaturesVotesCollection.InsertOneAsync(featureVote, options, base.RequestCancellationToken);
        }

        public async Task UnvoteToFeature(string featureId, string userId)
        {
            if (!CheckIfFeatureExists(featureId))
            {
                throw ExceptionsApi.UnvotedFeatureDoesntExistException();
            }

            Dictionary<string, string> values = new Dictionary<string, string>();
            values["featureId"] = featureId;
            values["userId"] = userId;

            FilterDefinition<FeatureVote> filter = new BsonDocument(values);
            await this.FeaturesVotesCollection.DeleteOneAsync(filter, base.RequestCancellationToken);
        }

        private bool CheckIfFeatureExists(string featureId)
        {
            return this.FeaturesCollection.AsQueryable<Feature>().Any(f => f.Id == new ObjectId(featureId));
        }
    }

    public interface IFeaturesService
    {
        Task<IEnumerable<Feature>> GetFeatures();

        Task<IEnumerable<string>> GetVotedFeaturesByUser(string userId);

        Task VoteToFeature(string featureId, string userId);

        Task UnvoteToFeature(string featureId, string userId);
    }
}
