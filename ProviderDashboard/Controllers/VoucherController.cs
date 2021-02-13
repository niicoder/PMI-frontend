using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;
using System;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Controllers
{
    [Route("api/voucher")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherService _voucherService;
        private readonly ILogger<VoucherController> _logger;

        public VoucherController(IVoucherService voucherService, ILogger<VoucherController> logger)
        {
            _voucherService = voucherService;
            _logger = logger;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetVoucher()
        {
            try
            {
                var vouchers = await _voucherService.GetAllVouchers();
                return Ok(vouchers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{voucherId}")]
        public async Task<IActionResult> GetVoucherById(Guid voucherId)
        {
            try
            {
                var voucher = await _voucherService.GetVoucher(voucherId);
                return Ok(voucher);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("byprovider/{providerId}")]
        public async Task<IActionResult> GetVouchersByProvider(int providerId)
        {
            try
            {
                var vouchers = await _voucherService.GetVouchers(providerId);
                return Ok(vouchers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("applyvoucher")]
        public async Task<IActionResult> ApplyVoucher(VoucherAssignDto req)
        {
            try
            {
                var vouchers = await _voucherService.AssignVoucherToInstructor(req);
                return Ok(vouchers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addvoucher")]
        public async Task<IActionResult> AddVoucher(VoucherDto req)
        {
            try
            {
                var voucher = await _voucherService.UpsertVoucher(req);
                return Ok(voucher);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
