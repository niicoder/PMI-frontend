using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/providerapplication")]
    [Authorize]
    public class ProviderApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly ILogger<ProviderApplicationsController> _logger;

        public ProviderApplicationsController(IApplicationService applicationService, ILogger<ProviderApplicationsController> logger)
        {
            _applicationService = applicationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetApplicationForUser()
        {
            try
            {
                var applications = await _applicationService.GetMyApplications();
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet]
        [Route("{appId}")]
        public async Task<IActionResult> GetApplicationById(Guid appId)
        {
            try
            {
                var application = await _applicationService.GetApplication(appId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication(ApplicationRequestDto applicationSubmitDto)
        {
            try
            {
                var application = await _applicationService.CreateApplication(applicationSubmitDto);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("{appId}/{criterionNumber}")]
        public async Task<ActionResult<ApplicationDto>> AgreeToCriterion([FromRoute]Guid appId, [FromRoute]int criterionNumber)
        {
            try
            {
                if (criterionNumber < 1 || criterionNumber > 8) throw new ArgumentException("criterionNumber must be between 1 and 8");
                var application = await _applicationService.AgreeToCriterion(appId, criterionNumber);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("{appId}")]
        public async Task<ActionResult<ApplicationDto>> SaveDemographics([FromRoute]Guid appId, [FromBody]ApplicationDemographicsDto demographics)
        {
            try
            {
                if (demographics == null) throw new ArgumentException("demographics data must be provided");
                var application = await _applicationService.SaveDemographics(appId, demographics);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
                
        [HttpPost]
        [Route("AgreeAndSign/{appId}")]
        public async Task<ActionResult<ApplicationDto>> AgreeAndSign([FromRoute]Guid appId, ApplicationSignatureDto signatureDto)
        {
            try
            {
                if (signatureDto == null) throw new ArgumentException("signature data must be provided");
                var application = await _applicationService.AgreeAndSign(appId, signatureDto);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("ComplianceAgreeAndSign/{appId}")]
        public async Task<ActionResult<ApplicationDto>> ComplianceAgreeAndSign([FromRoute]Guid appId, ComplianceSignatureDto signatureDto)
        {
            try
            {
                if (signatureDto == null) throw new ArgumentException("signature data must be provided");
                var application = await _applicationService.ComplianceAgreeAndSign(appId, signatureDto);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
                
        [HttpPost]
        [Route("SelectPlan/{appId}/{plan}")]
        public async Task<ActionResult<ApplicationDto>> SelectPlan([FromRoute]Guid appId, string plan)
        {
            try
            {
                var application = await _applicationService.SelectPlan(appId, plan);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("SubmitApplication/{appId}")]
        public async Task<ActionResult<ApplicationDto>> SubmitApplication([FromRoute]Guid appId)
        {
            try
            {
                var application = await _applicationService.SubmitApplication(appId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("AddProcessingNote/{appId}")]
        public async Task<IActionResult> AddProcessingNote([FromRoute]Guid appId, AddNoteRequestDto noteCreateDto)
        {
            try
            {
                var application = await _applicationService.AddProcessingNote(appId, noteCreateDto);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("withdraw/{appId}")]
        public async Task<IActionResult> SetWithdraw(Guid appId)
        {
            try
            {
                var application = await _applicationService.SetWithdraw(appId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}