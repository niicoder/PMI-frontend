using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/providerrelationship")]
    [Authorize]
    public class ProviderRelationshipController : ControllerBase
    {
        private readonly IProviderRelationshipService _providerRelationshipService;
        private readonly ILogger<ProviderRelationshipController> _logger;

        public ProviderRelationshipController(IProviderRelationshipService providerRelationshipService, ILogger<ProviderRelationshipController> logger)
        {
            _providerRelationshipService = providerRelationshipService;
            _logger = logger;
        }

        [HttpGet("GetProviderId/{childId}")]
        public async Task<IActionResult> GetProviderId(int childId)
        {
            try
            {
                var result = await _providerRelationshipService.GetProviderIdbyPersonId(childId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("HasRelationship")]
        public async Task<IActionResult> HasRelationship(InstructorRelationshipDto request)
        {
            try
            {
                var result = await _providerRelationshipService.HasRelationship(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
