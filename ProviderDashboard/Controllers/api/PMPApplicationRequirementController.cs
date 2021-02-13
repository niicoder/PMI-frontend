using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/pmpapplicationrequirement")]
    [Authorize]
    public class PMPApplicationRequirementController : ControllerBase
    {
        private readonly IApplicationRequirementService _applicationRequirementService;
        private readonly ILogger<PMPDocumentController> _logger;

        public PMPApplicationRequirementController(IApplicationRequirementService applicationRequirementService, ILogger<PMPDocumentController> logger)
        {
            _applicationRequirementService = applicationRequirementService;
            _logger = logger;
        }
        
        [HttpGet]
        [Route("GetApplicationRequirements/{appId}")]
        public async Task<IActionResult> GetApplicationRequirements([FromRoute]Guid appId)
        {
            try
            {
                var applicationRequirements = await _applicationRequirementService.GetApplicationRequirements(appId);
                return Ok(applicationRequirements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("GetApplicationListRequirements/{appId}")]
        public async Task<IActionResult> GetApplicationListRequirements([FromBody]List<Guid> appId)
        {
            try
            {
                var applicationRequirements = await _applicationRequirementService.GetApplicationListRequirements(appId);
                return Ok(applicationRequirements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetApplicationRequirementByID/{eventId}")]
        public async Task<IActionResult> GetApplicationRequirementByID(Guid eventId)
        {
            try
            {
                var applicationRequirement = await _applicationRequirementService.GetApplicationRequirementByID(eventId);
                return Ok(applicationRequirement);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddApplicationRequirement")]
        public async Task<IActionResult> AddApplicationRequirement([FromBody]ApplicationRequirementDto processingModel)
        {
            try
            {
                var applicationRequirement = await _applicationRequirementService.AddApplicationRequirement(processingModel);
                return Ok(applicationRequirement);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("UpdateApplicationRequirement")]
        public async Task<IActionResult> UpdateApplicationRequirement([FromBody]ApplicationRequirementDto processingModel)
        {
            try
            {
                var applicationRequirement = await _applicationRequirementService.UpdateApplicationRequirement(processingModel);
                return Ok(applicationRequirement);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteApplicationRequirement/{noteId}")]
        public async Task<IActionResult> DeleteApplicationRequirement([FromRoute]Guid noteId)
        {
            try
            {
                await _applicationRequirementService.DeleteApplicationRequirement(noteId);
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}