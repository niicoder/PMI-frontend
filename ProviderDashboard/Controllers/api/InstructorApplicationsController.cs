using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;
using ProviderDashboard.Dto;
using PMI.ESP3.Provider.Core.Enums;
using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.V1.Dto.Filters;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/instructorapplication")]
    [Authorize]
    public class InstructorApplicationController : ControllerBase
    {
        private readonly IInstructorApplicationService _applicationService;
        private readonly IApplicationRequirementService _applicationRequirementService;
        private readonly ITrainingEventService _trainingEventService;
        private readonly IVoucherService _voucherServicce;
        private readonly IInvoiceService _invoiceService;
        private readonly ILogger<InstructorApplicationController> _logger;
        private readonly ITokenService _tokenSvc;

        public InstructorApplicationController(IApplicationRequirementService applicationRequirementService,
            IInstructorApplicationService applicationService,
            ITrainingEventService trainingEventService,
            IVoucherService voucherService,
            IInvoiceService invoiceService,
            ILogger<InstructorApplicationController> logger,
            ITokenService tokenSvc)
        {
            _applicationRequirementService = applicationRequirementService;
            _voucherServicce = voucherService;
            _invoiceService = invoiceService;
            _trainingEventService = trainingEventService;
            _applicationService = applicationService;
            _logger = logger;
            _tokenSvc = tokenSvc;
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication(InstructorCreateApplicationDto req)
        {
            try
            {
                var application = await _applicationService.CreateApplication(req);

                return Ok(application);
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

        [HttpGet]
        [Route("GetModalities")]
        public async Task<IActionResult> GetModalities()
        {
            try
            {
                var result = await _trainingEventService.GetModalities();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetInstructorOverviewApplication/{appId}")]
        public async Task<IActionResult> GetInstructorOverviewApplication(Guid appId)
        {
            try
            {
                var application = await _applicationService.GetInstructorOverviewApplication(appId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetApplicationByInstructorId/{instructorId}")]
        public async Task<IActionResult> GetApplicationByInstructorId(int instructorId)
        {
            try
            {
                var application = await _applicationService.GetApplicationsByInstructorId(instructorId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTrainingEventRegisterations/{appId}")]
        public async Task<IActionResult> GetTrainingEventRegisterations(Guid appId)
        {
            try
            {
                var trainingEvents = await _trainingEventService.GetTrainingEventRegisterations(appId);
                return Ok(trainingEvents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("GetTrainingEvents")]
        public async Task<IActionResult> GetTrainingEvents(TrainingEventFilter req)
        {
            try
            {
                var trainingEvents = await _trainingEventService.GetTrainingEvents(req);
                return Ok(trainingEvents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetEventsRegistered/{appId}")]
        public async Task<IActionResult> GetTrainingEventsRegistered([FromQuery] Guid appId)
        {
            try
            {
                var trainingEvents = await _trainingEventService.GetTrainingEventRegisterations(appId);
                return Ok(trainingEvents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTrainingEventByID/{eventId}")]
        public async Task<IActionResult> GetTrainingEventByID(Guid eventId)
        {
            try
            {
                var trainingEvent = await _trainingEventService.GetTrainingEventByID(eventId);
                return Ok(trainingEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTrainingEventLoginLink/{appId}/{eventRegistrationId}")]
        public async Task<IActionResult> GetTrainingEventLoginLink(Guid appId, Guid eventRegistrationId)
        {
            try
            {
                // Only return link if app is in valid state
                var app = await _applicationService.GetApplication(appId);
                var getLink = (app.StatusId == (int)ApplicationStatusEnum.AwaitingTraining || app.StatusId == (int)ApplicationStatusEnum.InTraining);

                if (!getLink)
                {
                    return Ok(null);
                }

                var trainingEventLink = await _trainingEventService.GetTrainingEventLoginLink(eventRegistrationId);
                return Ok(trainingEventLink);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SetAppStatus/{appId}/{status}")]
        public async Task<IActionResult> SetAppStatus([FromRoute] Guid appId, [FromRoute] int status)
        {
            try
            {
                if (!HasAdminPerms()) throw new UnauthorizedAccessException("Insufficent Permissions");

                if (status == (int)ApplicationStatusEnum.Invoiced)
                {
                    // Send Invoice
                    await sendInvoice(appId);
                }

                InstructorStatusDto statusDto = new InstructorStatusDto { Id = appId, StatusId = status };

                var res = await _applicationService.SetInstructorApplicationStatus(statusDto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SetAppPaidStatus")]
        public async Task<IActionResult> SetAppPaidStatus(InvoiceDataDto invoiceDto)
        {
            try
            {
                if (!HasAdminPerms()) throw new UnauthorizedAccessException("Insufficent Permissions");

                var invoice = await _invoiceService.GetInvoice(invoiceDto.ApplicationId);
                if (invoice == null) throw new Exception($"Invoice Not Found");

                invoice.ReferenceId = invoiceDto.ReferenceId;

                DateTime paidDate = DateTime.MinValue;
                if (DateTime.TryParse(invoiceDto.PaidDate, out paidDate))
                {
                    invoice.PaidDate = paidDate;
                }
                else
                {
                    throw new Exception($"Invalid Date");
                }

                Decimal amountPaid = 0;
                if (Decimal.TryParse(invoiceDto.AmountPaid, out amountPaid))
                {
                    invoice.AmountPaid = amountPaid;
                }
                else
                {
                    throw new Exception($"Invalid Amount");
                }

                await _invoiceService.MarkT3InvoicePaid(invoice);

                InstructorStatusDto statusDto = new InstructorStatusDto
                {
                    Id = invoiceDto.ApplicationId,
                    StatusId = (int)ApplicationStatusEnum.AwaitingTraining
                };

                var res = await _applicationService.SetInstructorApplicationStatus(statusDto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("SetPending/{appId}")]
        public async Task<IActionResult> SetPending([FromRoute] Guid appId)
        {
            try
            {
                InstructorStatusDto statusDto = new InstructorStatusDto { Id = appId, StatusId = (int)ApplicationStatusEnum.Pending };

                var res = await _applicationService.SetInstructorApplicationStatus(statusDto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("WithdrawApplication/{appId}")]
        public async Task<IActionResult> WithdrawApplication([FromRoute] Guid appId)
        {
            try
            {
                var res = await _applicationService.WithdrawApplication(appId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AgreeAndSign/{appId}")]
        public async Task<IActionResult> AgreeAndSign([FromRoute] Guid appId, [FromBody] InstructorAgreementDto agreementDto)
        {
            try
            {
                if (!agreementDto.Agreement01Checked)
                {
                    throw new ArgumentNullException("Please mark all checkboxes");
                }

                ApplicationRequirementDto reqDto = new ApplicationRequirementDto
                {
                    ApplicationID = appId,
                    Satisfied = true,
                    IsActive = true,
                    Key = RequirementDefinitions.Agreement
                };

                var res = await _applicationRequirementService.UpdateApplicationRequirement(reqDto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SubmitApp/{appId}")]
        public async Task<IActionResult> SubmitApp([FromRoute] Guid appId)
        {

            try
            {
                var app = await _applicationService.GetApplication(appId);
                var agreementReq = app.Requirements.Where(req => req.Key == RequirementDefinitions.Agreement).FirstOrDefault();
                var docReq = app.Requirements.Where(req => req.Key == RequirementDefinitions.ProofOfExperience).FirstOrDefault();

                if (!(agreementReq.Satisfied && docReq.Satisfied))
                {
                    throw new ArgumentNullException("Please satisfy previous step requirements");
                }

                var res = await _applicationService.SubmitApplication(appId);

                ApplicationRequirementDto reqDto = new ApplicationRequirementDto
                {
                    ApplicationID = appId,
                    Satisfied = true,
                    IsActive = true,
                    Key = RequirementDefinitions.SubmitApplication
                };

                await _applicationRequirementService.UpdateApplicationRequirement(reqDto);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("EventAssessment/{refernceId}")]
        public async Task<IActionResult> EventAssessment([FromRoute] string refernceId)
        {
            try
            {
                var result = await _trainingEventService.EventAssessments(refernceId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SetAdditionalInfo/{appId}")]
        public async Task<IActionResult> SetAdditionalInfo([FromRoute] Guid appId)
        {
            try
            {
                if (!HasAdminPerms()) throw new UnauthorizedAccessException("Insufficent Permissions");

                await _applicationService.SetAdditionalInfoRequired(appId);

                ApplicationRequirementDto reqDto = new ApplicationRequirementDto
                {
                    ApplicationID = appId,
                    Satisfied = false,
                    IsActive = true,
                };

                reqDto.Key = RequirementDefinitions.ProofOfExperience;
                await _applicationRequirementService.UpdateApplicationRequirement(reqDto);

                reqDto.Key = RequirementDefinitions.SubmitApplication;
                var res = await _applicationRequirementService.UpdateApplicationRequirement(reqDto);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddTrainingEvent")]
        public async Task<IActionResult> AddTrainingEvent([FromBody] TrainingEventDto trainingEventModel)
        {
            try
            {
                var trainingEvent = await _trainingEventService.AddTrainingEvent(trainingEventModel);
                return Ok(trainingEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("RegisterTrainingEvent")]
        public async Task<IActionResult> RegisterTrainingEvent([FromBody] TrainingEventRegistrationDto trainingEventModel)
        {
            try
            {
                var trainingEvent = await _trainingEventService.RegisterTrainingEvent(trainingEventModel);

                return Ok(trainingEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("EventAttendance/{refernceId}")]
        public async Task<IActionResult> EventAttendance([FromRoute] string refernceId)
        {
            try
            {
                var result = await _trainingEventService.EventAttendance(refernceId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("UpdateTrainingEvent")]
        public async Task<IActionResult> UpdateTrainingEvent([FromBody] TrainingEventDto trainingEventModel)
        {
            try
            {
                var trainingEvent = await _trainingEventService.UpdateTrainingEvent(trainingEventModel);
                return Ok(trainingEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteTrainingEvent/{appId}")]
        public async Task<IActionResult> DeleteTrainingEvent([FromRoute] Guid eventId)
        {
            try
            {
                await _trainingEventService.DeleteTrainingEvent(eventId);
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AssignToAdmin/{appId}/{username}")]
        public async Task<IActionResult> AssignToAdmin([FromRoute] Guid appId, [FromRoute] string username)
        {
            try
            {
                if (!HasAdminPerms()) throw new UnauthorizedAccessException("Insufficent Permissions");

                var res = await _applicationService.AssignToAdmin(appId, username);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        #region "Private Methods"
        private bool HasAdminPerms()
        {
            var hasPerm = _tokenSvc.HasPermission(new List<string>() {
                   {Helper.AdminPerm}
               });
            return hasPerm;
        }

        private async Task sendInvoice(Guid appId)
        {
            // Send Invoice for PMP Application
            var invoiceDto = new InvoiceDto
            {
                ApplicationId = appId,
                ApplicationTypeId = (int)ApplicationTypeEnum.PMPExamPrepInstructor,
            };

            await _invoiceService.IssueInvoice(invoiceDto);
        }
        #endregion

    }
}