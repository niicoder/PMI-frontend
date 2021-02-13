using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IApplicationService
    {
        Task<PagedResult<ApplicationDto>> GetAllApplications(ApplicationFilterDto filters);
        Task<List<ApplicationDto>> GetMyApplications();
        Task<ApplicationDto> CreateApplication(ApplicationRequestDto submitDto);
        Task<ApplicationDto> SetStatus(Guid appId, string status);
        Task<ApplicationDto> SetWithdraw(Guid appId);
        Task<ApplicationDto> AgreeToCriterion(Guid appId, int criterion);
        Task<ApplicationDto> SaveDemographics(Guid appId, ApplicationDemographicsDto demographicsDto);
        Task<ApplicationDto> AgreeAndSign(Guid appId,ApplicationSignatureDto signatureDto);
        Task<ApplicationDto> ComplianceAgreeAndSign(Guid appId, ComplianceSignatureDto signatureDto);
        Task<ApplicationDto> SelectPlan(Guid appId, string plan);
        Task<ApplicationDto> GetApplication(Guid appId);
        Task<ApplicationDto> SubmitApplication(Guid appId);
        Task<ApplicationDto> AddProcessingNote(Guid appId, AddNoteRequestDto noteCreateDto);
        Task<ApplicationDto> AssignToAdminAsync(Guid appId, string username);
        Task<bool> SetNoteVisiblityAsync(Guid appId, Guid noteId, bool visible);
        Task<ApplicationDto> SyncCoreProvider(Guid appId);
        Task<ApplicationDto> SyncCoreProvider(Guid appId, string providerNumber);
    }
    
    public class ApplicationService : IApplicationService
    {
        private readonly IProviderService _providerSvc;

        public ApplicationService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }
        
        public async Task<PagedResult<ApplicationDto>> GetAllApplications(ApplicationFilterDto filters)
        {
            var result = new PagedResult<ApplicationDto>();
            var response = await _providerSvc.Client.Application.GetApplicationsAsync(filters, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetApplicationsAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task<List<ApplicationDto>> GetMyApplications()
        {
            var result = new List<ApplicationDto>();
            var response = await _providerSvc.Client.Application.GetMyApplicationsAsync(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetMyApplicationsAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task<ApplicationDto> GetApplication(Guid appId)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.GetApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetApplicationAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> CreateApplication(ApplicationRequestDto submitDto)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.CreateApplicationRequestAsync(submitDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.CreateApplicationRequestAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> AgreeToCriterion(Guid appId, int criterion)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.AgreeToCriterionAsync(appId, criterion, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.AgreeToCriterionAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task<ApplicationDto> SaveDemographics(Guid appId, ApplicationDemographicsDto demographicsDto)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.SaveDemographicsAsync(appId, demographicsDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SaveDemographicsAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> AgreeAndSign(Guid appId, ApplicationSignatureDto signatureDto)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.AgreeAndSignAsync(appId, signatureDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.AgreeAndSignAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> ComplianceAgreeAndSign( Guid appId, ComplianceSignatureDto signatureDto)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.ComplianceAgreeAndSignAsync(appId, signatureDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.ComplianceAgreeAndSignAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> SelectPlan(Guid appId, string plan)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.SelectPlanAsync(appId, plan, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SelectPlanAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task<ApplicationDto> SubmitApplication(Guid appId)
        {            
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.SubmitApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SubmitApplicationAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
        
        public async Task<ApplicationDto> AddProcessingNote( Guid appId, AddNoteRequestDto noteCreateDto)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.AddProcessingNoteAsync(appId, noteCreateDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.AddProcessingNoteAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> SetStatus(Guid appId, string status)
        {
            ApplicationDto result = null;
            var response =
                await _providerSvc.Client.Application.SetApplicationStatusAsync(appId, status, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SetApplicationStatusAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationDto> SetWithdraw(Guid appId)
        {
            ApplicationDto result = null;
            var response =
                await _providerSvc.Client.Application.WithdrawApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.WithdrawApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
    
        public async Task<ApplicationDto> AssignToAdminAsync(Guid appId, string username)
        {
            ApplicationDto result = null;
            var response =
                await _providerSvc.Client.Application.AssignToAdminAsync(appId, username, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.AssignToAdminAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<bool> SetNoteVisiblityAsync(Guid appId, Guid noteId, bool visible)
        {   
            var response = await _providerSvc.Client.Application.SetNoteVisibilityAsync(appId, noteId, visible, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SetNoteVisiblityAsync: {response.ErrorMessage}");
            }
            
            return response != null && response.Data;
        }

        public async Task<ApplicationDto> SyncCoreProvider(Guid appId)
        {
            return await SyncCoreProvider(appId, null);
        }

        public async Task<ApplicationDto> SyncCoreProvider(Guid appId, string providerNumber)
        {
            ApplicationDto result = null;
            var response = await _providerSvc.Client.Application.SyncCoreProvider(appId, providerNumber, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.SyncCoreProvider: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
    }
}