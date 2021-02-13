using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProviderDashboard.Services;
using System;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto.Filters;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Controllers
{
    [Route("api/instructor")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorService _instructorService;
        private readonly ILogger<InstructorController> _logger;

        public InstructorController(IInstructorService instructorService, ILogger<InstructorController> logger)
        {
            _instructorService = instructorService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInstructor(InstructorRelationshipDto instructorSubmitDto)
        {
            try
            {
                var result = await _instructorService.AddInstructor(instructorSubmitDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveInstructor(InstructorRelationshipDto req)
        {
            try
            {
                var result = await _instructorService.RemoveInstructor(req);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("byprovider")]
        public async Task<IActionResult> GetInstructorsByProvider(InstructorFilterDto filterDto)
        {
            try
            {
                var instructors = await _instructorService.GetInstructorsByProvider(filterDto);
                return Ok(instructors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("qualifications/{instructorId}")]
        public async Task<IActionResult> GetQualifications(int instructorId)
        {
            try
            {
                var qualifications = await _instructorService.GetQualifications(instructorId);
                return Ok(qualifications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("IsAssignableAsInstructor/{instructorId}")]
        public async Task<IActionResult> AssignableAsInstructor(int instructorId)
        {
            try
            {
                var result = await _instructorService.AssignableAsInstructor(instructorId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("providers/{instructorId}")]
        public async Task<IActionResult> GetProviders(int instructorId)
        {
            try
            {
                var providers = await _instructorService.GetAssociatedProviders(instructorId);
                return Ok(providers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("applications")]
        public async Task<IActionResult> GetApplications([FromBody] InstructorApplicationFilterDto filter)
        {
            try
            {
                var applications = await _instructorService.GetInstructorApplications(filter);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
