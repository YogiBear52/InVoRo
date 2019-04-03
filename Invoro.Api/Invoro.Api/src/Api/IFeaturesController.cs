using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Invoro.Api.src.Api
{
    public interface IFeaturesController
    {
        Task<IActionResult> GetFeatures();
    }
}