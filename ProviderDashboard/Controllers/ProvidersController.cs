using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/providers")]
    [Authorize]
    public class ProvidersController : ControllerBase
    {
        private readonly IGetProvidersService _getProvidersService;
        private readonly ILogger<ProvidersController> _logger;

        public ProvidersController(IGetProvidersService getProvidersService, ILogger<ProvidersController> logger)
        {
            _getProvidersService = getProvidersService;
            _logger = logger;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetProviderForUser()
        //{
        //    try
        //    {
        //        var providers = await _getProvidersService.GetMyProviders();
        //        return Ok(providers);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, ex.Message);
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet]
        //[Route("{providerId}")]
        //public async Task<IActionResult> GetProviderById(string providerId)
        //{
        //    try
        //    {
        //        var provider = await _getProvidersService.GetProvider(providerId);
        //        return Ok(provider);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, ex.Message);
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpGet]
        [Route("core/{coreProviderId}")]
        public async Task<IActionResult> GetProviderFromCore(string coreProviderId)
        {
            try
            {
                var coreProvider = await _getProvidersService.GetProviderFromCore(coreProviderId);
                return Ok(coreProvider);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}