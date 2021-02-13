using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IProviderRelationshipService
    {

        Task<int> GetProviderIdbyPersonId(int personId);
        Task<int> IsInstructor(int personId);
        Task<List<ProviderRelationshipDto>> GetProviderRelationshipbyParentId(int parentId);
        Task<bool> HasRelationship(InstructorRelationshipDto req);
    }


    public class ProviderRelationshipService : IProviderRelationshipService
    {
        private readonly IProviderService _providerSvc;

        public ProviderRelationshipService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<bool> HasRelationship(InstructorRelationshipDto req)
        {
            var result = new List<ProviderRelationshipDto>();

            var response = await _providerSvc.Client.ProviderRelationship.GetProviderRelationshipbyParentIdAsync(req.ParentId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.ProviderRelationship.GetProviderRelationshipbyParentIdAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            var match = result.Find(x => x.IsActive == true && x.ProviderRelationshipTypeId == 53 && x.ChildId == req.ChildId);
            return match != null;
        }

        public async Task<List<ProviderRelationshipDto>> GetProviderRelationshipbyParentId(int parentId)
        {
            var result = new List<ProviderRelationshipDto>();

            var response = await _providerSvc.Client.ProviderRelationship.GetProviderRelationshipbyParentIdAsync(parentId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.ProviderRelationship.GetProviderRelationshipbyParentIdAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<int> IsInstructor(int personId)
        {
            var result = new List<ProviderRelationshipDto>();
            var response = await _providerSvc.Client.ProviderRelationship.GetProviderRelationshipbyChildIdAsync(personId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.ProviderRelationship.GetProviderRelationshipbyChildIdAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            var match = result.Find(x => x.IsActive == true && x.ProviderRelationshipTypeId == 53);
            if (match != null)
            {
                return match.ID;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> GetProviderIdbyPersonId(int personId)
        {
            var result = new List<ProviderRelationshipDto>();
            var response = await _providerSvc.Client.ProviderRelationship.GetProviderRelationshipbyChildIdAsync(personId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.ProviderRelationship.GetProviderRelationshipbyChildIdAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            var match = result.Find(x => x.IsActive == true && x.ProviderRelationshipTypeId == 51);
            if (match != null)
            {
                return match.ParentId;
            }
            else
            {
                throw new KeyNotFoundException();
            }
        }
    }
}

