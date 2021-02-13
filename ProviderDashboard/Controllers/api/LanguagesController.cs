using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/languages")]
    public class LanguagesController : ControllerBase
    {
        private readonly ILanguageService _languageService;
        private readonly ILogger<LanguagesController> _logger;

        public LanguagesController(ILanguageService languageService, ILogger<LanguagesController> logger)
        {
            _languageService = languageService;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCountries()
        {
            try
            {
                var result = await _languageService.GetLanguages();
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, ex.Message);
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}