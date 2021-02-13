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
    public interface IApplicationRequirementService
    {
        Task<List<ApplicationRequirementDto>> GetApplicationRequirements(Guid appId);
        Task<List<ApplicationRequirementDto>> GetApplicationListRequirements(List<Guid> appId);
        Task<ApplicationRequirementDto> GetApplicationRequirementByID(Guid noteId);
        Task<ApplicationRequirementDto> AddApplicationRequirement(ApplicationRequirementDto applicationRequirement);
        Task<ApplicationRequirementDto> UpdateApplicationRequirement(ApplicationRequirementDto applicationRequirement);
        Task DeleteApplicationRequirement(Guid noteId);
    }

    public class ApplicationRequirementService : IApplicationRequirementService
    {
        private readonly IProviderService _providerSvc;

        public ApplicationRequirementService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<List<ApplicationRequirementDto>> GetApplicationRequirements(Guid appId)
        {
            List<ApplicationRequirementDto> result = null;
            var response = await _providerSvc.Client.Instructor.GetApplicationRequirementsAsync(appId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.GetApplicationRequirements: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<List<ApplicationRequirementDto>> GetApplicationListRequirements(List<Guid> appId)
        {
            List<ApplicationRequirementDto> result = null;
            var response = await _providerSvc.Client.Instructor.GetApplicationListRequirementsAsync(appId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.GetApplicationListRequirements: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationRequirementDto> GetApplicationRequirementByID(Guid noteId)
        {
            ApplicationRequirementDto result = null;
            var response = await _providerSvc.Client.Instructor.GetApplicationRequirementByIdAsync(noteId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.GetApplicationRequirementByID: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
            throw new NotImplementedException();
        }

        public async Task<ApplicationRequirementDto> AddApplicationRequirement(ApplicationRequirementDto applicationRequirement)
        {
            ApplicationRequirementDto result = null;
            var response = await _providerSvc.Client.Instructor.AddApplicationRequirementAsync(applicationRequirement, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.AddApplicationRequirementAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<ApplicationRequirementDto> UpdateApplicationRequirement(ApplicationRequirementDto applicationRequirement)
        {
            ApplicationRequirementDto result = null;
            var response = await _providerSvc.Client.Instructor.UpdateApplicationRequirementAsync(applicationRequirement, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.UpdateApplicationRequirement: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task DeleteApplicationRequirement(Guid noteId)
        {
            var response = await _providerSvc.Client.Instructor.DeleteApplicationRequirementAsync(noteId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ApplicationRequirementService.DeleteApplicationRequirement: {response.ErrorMessage}");
            }
        }

    }
}
