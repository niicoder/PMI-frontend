using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;
using PMI.ESP3.PMI.ESP3.Framework.Utilities;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/pmpprocessingnote")]
    [Authorize]
    public class PMPProcessingNoteController : ControllerBase
    {
        private readonly IProcessingNoteService _processingNoteService;
        private readonly ITokenService _tokenSvc;
        private readonly ILogger<PMPDocumentController> _logger;

        public PMPProcessingNoteController(IProcessingNoteService processingNoteService, ITokenService tokenSvc, ILogger<PMPDocumentController> logger)
        {
            _processingNoteService = processingNoteService;
            _tokenSvc = tokenSvc;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetInstructorProcessingNotes/{appId}")]
        public async Task<IActionResult> GetInstructorProcessingNotes([FromRoute] Guid appId)
        {
            try
            {
                var processingNotes = await _processingNoteService.GetProcessingNotes(appId);
                var filteredList = processingNotes.Where(note => note.IsVisibleToProvider == true).ToList<ProcessingNoteDto>();
                return Ok(filteredList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetProcessingNotes/{appId}")]
        public async Task<IActionResult> GetProcessingNotes([FromRoute] Guid appId)
        {
            try
            {
                if (!HasAdminPerms()) throw new UnauthorizedAccessException("Insufficent Permissions");

                var processingNotes = await _processingNoteService.GetProcessingNotes(appId);
                return Ok(processingNotes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetProcessingNoteByID/{eventId}")]
        public async Task<IActionResult> GetProcessingNoteByID(Guid eventId)
        {
            try
            {
                var processingNote = await _processingNoteService.GetProcessingNoteByID(eventId);
                return Ok(processingNote);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddProcessingNote")]
        public async Task<IActionResult> AddProcessingNote([FromBody] ProcessingNoteDto processingModel)
        {
            try
            {
                processingModel.FromPartyId = "PARTY_PMI";
                var processingNote = await _processingNoteService.AddProcessingNote(processingModel);
                return Ok(processingNote);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("UpdateProcessingNote")]
        public async Task<IActionResult> UpdateProcessingNote([FromBody] ProcessingNoteDto processingModel)
        {
            try
            {
                var processingNote = await _processingNoteService.UpdateProcessingNote(processingModel);
                return Ok(processingNote);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteProcessingNote/{noteId}")]
        public async Task<IActionResult> DeleteProcessingNote([FromRoute] Guid noteId)
        {
            try
            {
                await _processingNoteService.DeleteProcessingNote(noteId);
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SetNoteVisibility/{appId}/{noteId}/{visible}")]
        public async Task<IActionResult> SetNoteVisibility([FromRoute] Guid appId, [FromRoute] Guid noteId, [FromRoute] bool visible)
        {
            try
            {
                var processingNote = await _processingNoteService.SetNoteVisibility(appId, noteId, visible);
                return Ok(processingNote);
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
        #endregion

    }
}