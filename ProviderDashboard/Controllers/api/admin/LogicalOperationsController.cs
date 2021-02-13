using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api.admin
{
    [ApiController]
    [Authorize]
    [Route("api/admin/operations")]
    public class OperationsController : ControllerBase
    {
        private readonly IOperationsService _operationsService;
        private readonly ILogger<OperationsController> _logger;

        public OperationsController(IOperationsService operationsService, ILogger<OperationsController> logger)
        {
            _operationsService = operationsService;
            _logger = logger;
        }

        [HttpPost("sync/provider/{providerNumber}")]
        public async Task<IActionResult> SyncProvider(string providerNumber)
        {
            try
            {
                await _operationsService.SyncProvider(providerNumber);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("sync/instructor/{instructorId}")]
        public async Task<IActionResult> SyncInstructor(int instructorId)
        {
            try
            {
                await _operationsService.SyncInstructor(instructorId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}