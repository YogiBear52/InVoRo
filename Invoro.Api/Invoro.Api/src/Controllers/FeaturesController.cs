using AutoMapper;
using Invoro.Api.src.Api;
using Invoro.Api.src.Authentication;
using Invoro.Api.src.DataModel;
using Invoro.Api.src.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invoro.Api.src.Controllers
{
    public class FeaturesController : BaseController, IFeaturesController
    {
        #region Ctor
        public FeaturesController(IFeaturesService featuresService, IAuthenticationService authenticationService, IMapper mapper)
            : base(mapper)
        {
            this.FeaturesService = featuresService;
            this.AuthenticationService = authenticationService;
        }

        public IFeaturesService FeaturesService { get; }
        public IAuthenticationService AuthenticationService { get; }

        #endregion

        [HttpGet]
        public async Task<IActionResult> GetFeatures()
        {
            IEnumerable<Feature> featuresFromMongo = await FeaturesService.GetFeatures();

            FeatureDtoResponse[] response =
                base.Mapper.Map<FeatureDtoResponse[]>(featuresFromMongo);

            return this.Ok(response);
        }
        
        [HttpGet]
        public async Task<IEnumerable<string>> GetVotedFeaturesByUser()
        {
            IEnumerable<string> votedFeatures = await FeaturesService.GetVotedFeaturesByUser(this.AuthenticationService.User.Identifier);

            return votedFeatures;
        }

        [HttpPost]
        [Route("{featureId}")]
        public async Task<IActionResult> VoteToFeature(string featureId)
        {
            try
            {
                await FeaturesService.VoteToFeature(featureId, this.AuthenticationService.User.Identifier);
            }
            catch (Exception exception)
            {
                return this.NotFound(exception.Message);
            }

            return this.Ok();
        }

        [HttpPost]
        [Route("{featureId}")]
        public async Task<IActionResult> UnvoteToFeature(string featureId)
        {
            try
            {
                await FeaturesService.UnvoteToFeature(featureId, this.AuthenticationService.User.Identifier);
            }
            catch(ArgumentException exception)
            {
                return this.NotFound(exception.Message);
            }

            return this.Ok();
        }
    }
}