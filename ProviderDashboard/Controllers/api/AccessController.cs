using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/getaccess")]
    [Authorize]
    public class AccessController : ControllerBase
    {
        private readonly IAccessService _accessService;
        private readonly ILogger<AccessController> _logger;

        public AccessController(IAccessService accessService, ILogger<AccessController> logger)
        {
            _accessService = accessService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserType()
        {
            try
            {
                var result = await _accessService.GetUserType();
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
