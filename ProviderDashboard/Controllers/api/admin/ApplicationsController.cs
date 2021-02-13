using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;
using PMI.ESP3.Provider.Core.Enums;

namespace ProviderDashboard.Controllers.api.admin
{
    [ApiController]
    [Authorize]
    [Route("api/admin/applications")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IInvoiceService _invoiceService;

        public ApplicationsController(IApplicationService applicationService,
            IInvoiceService invoiceService,
            ILogger<ApplicationsController> logger)
        {
            _applicationService = applicationService;
            _invoiceService = invoiceService;
            _logger = logger;
        }

        [HttpGet("{appId}")]
        public async Task<IActionResult> GetApplication(Guid appId)
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
        public async Task<IActionResult> GetAllApplications(ApplicationFilterDto filters)
        {
            try
            {
                var applications = await _applicationService.GetAllApplications(filters);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("status/{appId}/{status}")]
        public async Task<IActionResult> SetStatus(Guid appId, string status)
        {
            try
            {
                if (status == Helper.AtpStatus.invoiceSent)
                {
                    // Send Invoice
                    await sendInvoice(appId);
                }

                var application = await _applicationService.SetStatus(appId, status);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("assigntoadmin/{appId}/{username}")]
        public async Task<IActionResult> AssignToAdmin(Guid appId, string username)
        {
            try
            {
                var application = await _applicationService.AssignToAdminAsync(appId, username);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{appId}/note/{noteId}/setvisibility/{visible}")]
        public async Task<IActionResult> SetNoteVisiblity(Guid appId, Guid noteId, bool visible)
        {
            try
            {
                var result = await _applicationService.SetNoteVisiblityAsync(appId, noteId, visible);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("synccoreprovider/{appId}")]
        public async Task<IActionResult> SyncCoreProvider(Guid appId)
        {
            try
            {
                var result = await _applicationService.SyncCoreProvider(appId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("synccoreprovider/{appId}/{providerNumber}")]
        public async Task<IActionResult> SyncCoreProvider(Guid appId, string providerNumber)
        {
            try
            {
                var result = await _applicationService.SyncCoreProvider(appId, providerNumber);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        #region "Private Methods"
        private async Task sendInvoice(Guid appId)
        {
            // Send Invoice for ATP Application
            var invoiceDto = new InvoiceDto
            {
                ApplicationId = appId,
                ApplicationTypeId = (int)ApplicationTypeEnum.ATPProvider,
            };

            await _invoiceService.IssueInvoice(invoiceDto);
        }
        #endregion

    }
}