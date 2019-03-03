using Invoro.Api.src.DataModel;
using Microsoft.AspNetCore.Http;
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
            FeaturesCollection = mongoService.GetCollection<Feature>("Features");
        }

        public IMongoCollection<Feature> FeaturesCollection { get; }

        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return 
                await this.FeaturesCollection
                    .Find(FilterDefinition<Feature>.Empty)
                    .ToListAsync(cancellationToken: base.RequestCancellationToken);
        }
    }

    public interface IFeaturesService
    {
        Task<IEnumerable<Feature>> GetFeatures();
    }
}
