using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Options;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api.admin
{
    [ApiController]
    [Authorize]
    [Route("api/admin/badges")]
    public class BadgeController : ControllerBase
    {
        private readonly BadgeSettingsOptions _badgeSettingsOptions;
        private readonly IBadgeService _badgeService;
        private readonly IApplicationRequirementService _applicationRequirementService;
        private readonly ILogger<BadgeController> _logger;

        public BadgeController(BadgeSettingsOptions badgeSettingsOptions,
            IBadgeService badgeService,
            IApplicationRequirementService applicationRequirementService,
            ILogger<BadgeController> logger)
        {
            _badgeSettingsOptions = badgeSettingsOptions;
            _badgeService = badgeService;
            _applicationRequirementService = applicationRequirementService;
            _logger = logger;
        }


        [HttpPost("IssueAtpBadge/{recipientId}")]
        public async Task<IActionResult> IssueAtpBadge([FromRoute] int recipientId)
        {
            try
            {
                BadgeRequestDto badgeRequestDto = new BadgeRequestDto
                {
                    RecipientId = recipientId,
                    BadgeTypeReferenceId = _badgeSettingsOptions.AtpBadgeRefId,
                    IssueDate = DateTime.UtcNow,
                    IsActive = true
                };

                var result = await _badgeService.IssueBadge(badgeRequestDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("IssueInstructorBadge/{appId}/{recipientId}")]
        public async Task<IActionResult> IssueInstructorBadge([FromRoute] Guid appId, [FromRoute] int recipientId)
        {
            try
            {
                BadgeRequestDto badgeRequestDto = new BadgeRequestDto
                {
                    RecipientId = recipientId,
                    BadgeTypeReferenceId = _badgeSettingsOptions.InstructorBadgeRefId,
                    IssueDate = DateTime.UtcNow,
                    IsActive = true
                };

                var result = await _badgeService.IssueBadge(badgeRequestDto);

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