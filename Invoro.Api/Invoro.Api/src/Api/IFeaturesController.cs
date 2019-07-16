using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Invoro.Api.src.Api
{
    public interface IFeaturesController
    {
        Task<IActionResult> GetFeatures();

        Task<IEnumerable<string>> GetVotedFeaturesByUser();

        Task<IActionResult> VoteToFeature(string featureId);

        Task<IActionResult> UnvoteToFeature(string featureId);
    }
}