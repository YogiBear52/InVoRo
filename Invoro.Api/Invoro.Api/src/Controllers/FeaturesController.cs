using AutoMapper;
using Invoro.Api.src.DataModel;
using Invoro.Api.src.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invoro.Api.src.Controllers
{
    public class FeaturesController : BaseController
    {
        #region Ctor
        public FeaturesController(IFeaturesService featuresService, IMapper mapper)
            : base(mapper)
        {
            FeaturesService = featuresService;
        }

        public IFeaturesService FeaturesService { get; }

        #endregion

        [HttpGet]
        public async Task<IActionResult> GetFeatures()
        {
            IEnumerable<Feature> featuresFromMongo = await FeaturesService.GetFeatures();

            FeatureDtoResponse[] response =
                base.Mapper.Map<FeatureDtoResponse[]>(featuresFromMongo);

            return this.Ok(response);
        }
    }
}