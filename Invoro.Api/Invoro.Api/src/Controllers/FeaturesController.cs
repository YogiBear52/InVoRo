using AutoMapper;
using Invoro.Api.src.DataModel;
using Invoro.Api.src.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Invoro.Api.src.Controllers
{
    [Route("api/[controller]")] // Find a way to make it as the Default Rounting without mention it explicitly
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
        public IActionResult GetFeatures()
        {
            IEnumerable<Feature> featuresFromMongo =
                 FeaturesService.GetFeatures();

            FeatureDtoResponse[] response =
                base.Mapper.Map<FeatureDtoResponse[]>(featuresFromMongo);

            return this.Ok(response);
        }
    }
}