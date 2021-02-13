using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;
using PMI.ESP3.Provider.Client.V1.Dto.Filters;
using ProviderDashboard.Dto;

namespace ProviderDashboard.Services
{
    public interface IInstructorApplicationService
    {
        Task<InstructorApplicationDto> GetApplication(Guid appId);
        Task<InstructorOverviewApplicationDto> GetInstructorOverviewApplication(Guid appId);
        Task<InstructorApplicationDto> CreateApplication(InstructorCreateApplicationDto submitData);
        Task<PagedResult<InstructorApplicationDto>> GetAllApplications(InstructorApplicationFilterDto filters);
        Task<PagedResult<InstructorApplicationDto>> GetApplicationsByInstructorId(int instId);
        Task<InstructorApplicationDto> SetInstructorApplicationStatus(InstructorStatusDto statusDto);
        Task<InstructorApplicationDto> SetAdditionalInfoRequired(Guid appId);
        Task<InstructorApplicationDto> SubmitApplication(Guid appId);
        Task<InstructorApplicationDto> WithdrawApplication(Guid appId);
        Task<InstructorApplicationDto> AssignToAdmin(Guid appId, string username);
    }

    public class InstructorApplicationService : IInstructorApplicationService
    {
        private readonly IProviderService _providerSvc;

        public InstructorApplicationService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<PagedResult<InstructorApplicationDto>> GetAllApplications(InstructorApplicationFilterDto filters)
        {
            var result = new PagedResult<InstructorApplicationDto>();
            var response = await _providerSvc.Client.InstructorApplication.GetInstructorApplicationListAsync(filters, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.GetInstructorApplicationListAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorOverviewApplicationDto> GetInstructorOverviewApplication(Guid appId)
        {

            InstructorOverviewApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.GetInstructorOverviewApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.GetInstructorOverviewApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> CreateApplication(InstructorCreateApplicationDto submitData)
        {
            InstructorApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.CreateInstructorApplicationAsync(submitData, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.CreateInstructorApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<PagedResult<InstructorApplicationDto>> GetApplicationsByInstructorId(int instId)
        {
            var result = new PagedResult<InstructorApplicationDto>();
            var response = await _providerSvc.Client.InstructorApplication.GetInstructorApplicationsByInstIdAsync(instId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.GetInstructorApplicationsByInstIdAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> GetApplication(Guid appId)
        {
            InstructorApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.GetInstructorApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.GetInstructorApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> SetInstructorApplicationStatus(InstructorStatusDto statusDto)
        {
            InstructorApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.SetInstructorApplicationStatusAsync(statusDto.Id, statusDto.StatusId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.SetInstructorApplicationStatus: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }


        public async Task<InstructorApplicationDto> SetAdditionalInfoRequired(Guid appId)
        {
            InstructorApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.SetAdditionalInfoRequiredAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.SetAdditionalInfoRequiredAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> SubmitApplication(Guid appId)
        {
            InstructorApplicationDto result = null;
            var response = await _providerSvc.Client.InstructorApplication.SubmitApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.SubmitApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> WithdrawApplication(Guid appId)
        {
            InstructorApplicationDto result = null;

            var response = await _providerSvc.Client.InstructorApplication.WithdrawApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.WithdrawApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorApplicationDto> AssignToAdmin(Guid appId, string username)
        {
            InstructorApplicationDto result = null;

            var response = await _providerSvc.Client.InstructorApplication.AssignToAdminAsync(appId, username, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.AssignToAdmin: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
    }
}