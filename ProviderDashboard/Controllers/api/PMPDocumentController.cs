using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Services;

namespace ProviderDashboard.Controllers.api
{
    [ApiController]
    [Route("api/pmpdocument")]
    [Authorize]
    public class PMPDocumentController : ControllerBase
    {
        private readonly IInstructorDocumentService _instructorDocumentService;
        private readonly ILogger<PMPDocumentController> _logger;

        public PMPDocumentController(IInstructorDocumentService instructorDocumentService, ILogger<PMPDocumentController> logger)
        {
            _instructorDocumentService = instructorDocumentService;
            _logger = logger;
        }
        
        [HttpGet]
        [Route("GetInstructorDocuments/{appId}")]
        public async Task<IActionResult> GetInstructorDocuments([FromRoute]Guid appId)
        {
            try
            {
                var documents = await _instructorDocumentService.GetInstructorDocuments(appId);
                return Ok(documents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("UploadInstructorDocument/{appId}/{fileType}")]
        public async Task<IActionResult> UploadInstructorDocument([FromRoute] Guid appId, [FromRoute]string fileType, List<IFormFile> files)
        {
            try
            {
                var documents = await _instructorDocumentService.UploadInstructorDocument(appId, fileType, files);
                return Ok(documents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteInstructorDocument/{filePath}")]
        public async Task<IActionResult> DeleteInstructorDocument([FromRoute]string filePath)
        {
            try
            {
                await _instructorDocumentService.DeleteInstructorDocument(filePath);
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}