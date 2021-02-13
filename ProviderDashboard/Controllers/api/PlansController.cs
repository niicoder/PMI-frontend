using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/plans")]
    [Authorize]
    public class PlansController : ControllerBase
    {
        private readonly IPlanService _planService;
        private readonly ILogger<PlansController> _logger;

        public PlansController(IPlanService planService, ILogger<PlansController> logger)
        {
            _planService = planService;
            _logger = logger;
        }
        
        [HttpGet("{appId}")]
        public async Task<IActionResult> GetPlans(Guid appId)
        {
            try
            {
                var plans = await _planService.GetPlans(appId);
                return Ok(plans);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}