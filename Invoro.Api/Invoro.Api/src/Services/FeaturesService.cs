using Invoro.Api.src.DataModel;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invoro.Api.src.Services
{
    public class FeaturesService : BaseService, IFeaturesService
    {
        public FeaturesService(IMongoService mongoService, IHttpContextAccessor httpContextAccessor)
            :base(httpContextAccessor)
        {
            Features = mongoService.GetCollection<Feature>("Features");
        }

        public IMongoCollection<Feature> Features { get; }

        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return 
                await this.Features.Find<Feature>
                        (new BsonDocument()).ToListAsync(cancellationToken: base.ServiceCancellationToken);
        }
    }

    public interface IFeaturesService
    {
        Task<IEnumerable<Feature>> GetFeatures();
    }
}
