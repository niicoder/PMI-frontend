using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Core.Enums;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Dto;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api.admin
{
    [ApiController]
    [Authorize]
    [Route("api/admin/invoices")]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly ILogger<InvoicesController> _logger;

        public InvoicesController(IInvoiceService invoiceService, ILogger<InvoicesController> logger)
        {
            _invoiceService = invoiceService;
            _logger = logger;
        }

        [HttpGet("app/{applicationId}")]
        public async Task<IActionResult> GetInvoice(Guid applicationId)
        {
            try
            {
                var result = await _invoiceService.GetInvoice(applicationId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("syncatpstatus/{applicationId}")]
        public async Task<IActionResult> SyncATPStatus(Guid? applicationId, [FromBody]InvoiceDataDto invoice)
        {
            try
            {
                var dto = new InvoiceDto
                {
                    ApplicationId = invoice.ApplicationId,
                    ApplicationTypeId = invoice.ApplicationTypeId,
                    ReferenceId = invoice.ReferenceId,
                    InvoiceAmount = invoice.InvoiceAmount,
                    InvoiceDate = invoice.InvoiceDate
                };

                DateTime paidDate = DateTime.MinValue;
                if (DateTime.TryParse(invoice.PaidDate, out paidDate))
                    dto.PaidDate = paidDate;

                Decimal amountPaid = 0;
                if (Decimal.TryParse(invoice.AmountPaid, out amountPaid))
                    dto.AmountPaid = amountPaid;

                var result = await _invoiceService.SyncATPStatus(dto);
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