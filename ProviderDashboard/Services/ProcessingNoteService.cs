using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.Options;
using PMI.ESP3.Provider.Client.V1;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProviderDashboard.Services
{
    public interface IProcessingNoteService
    {
        Task<List<ProcessingNoteDto>> GetProcessingNotes(Guid appId);
        Task<ProcessingNoteDto> GetProcessingNoteByID(Guid noteId);
        Task<ProcessingNoteDto> AddProcessingNote(ProcessingNoteDto processingNote);
        Task<ProcessingNoteDto> UpdateProcessingNote(ProcessingNoteDto processingNote);
        Task<ProcessingNoteDto> SetNoteVisibility(Guid appId, Guid noteId, bool visible);
        Task DeleteProcessingNote(Guid noteId);
    }

    public class ProcessingNoteService : IProcessingNoteService
    {
        private readonly IProviderService _providerSvc;

        public ProcessingNoteService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<List<ProcessingNoteDto>> GetProcessingNotes(Guid appId)
        {
            List<ProcessingNoteDto> result = null;
            var response = await _providerSvc.Client.Instructor.GetAllProcessingNotesAsync(appId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.GetProcessingNotes: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ProcessingNoteDto> GetProcessingNoteByID(Guid noteId)
        {
            ProcessingNoteDto result = null;
            var response = await _providerSvc.Client.Instructor.GetProcessingNoteByIDAsync(noteId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.GetProcessingNoteByID: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
            throw new NotImplementedException();
        }

        public async Task<ProcessingNoteDto> AddProcessingNote(ProcessingNoteDto processingNote)
        {
            ProcessingNoteDto result = null;
            var response = await _providerSvc.Client.Instructor.AddProcessingNoteAsync(processingNote, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.AddProcessingNoteAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ProcessingNoteDto> UpdateProcessingNote(ProcessingNoteDto processingNote)
        {
            ProcessingNoteDto result = null;
            var response = await _providerSvc.Client.Instructor.UpdateProcessingNoteAsync(processingNote, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.UpdateProcessingNote: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ProcessingNoteDto> SetNoteVisibility(Guid appId, Guid noteId, bool visible)
        {
            ProcessingNoteDto result = null;
            var response = await _providerSvc.Client.Instructor.SetProcessingNoteVisibilityAsync(appId, noteId, visible, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.SetNoteVisibility: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task DeleteProcessingNote(Guid noteId)
        {
            var response = await _providerSvc.Client.Instructor.DeleteProcessingNoteAsync(noteId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProcessingNoteService.DeleteProcessingNote: {response.ErrorMessage}");
            }
        }

    }
}
