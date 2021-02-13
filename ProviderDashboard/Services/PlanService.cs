using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IPlanService
    {
        Task<List<PlanDto>> GetPlans(Guid appId);
    }
    
    public class PlanService : IPlanService
    {
        private readonly IProviderService _providerSvc;

        public PlanService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }       

        public async Task<List<PlanDto>> GetPlans(Guid appId)    
        {
            var result = new List<PlanDto>();
            var response = await _providerSvc.Client.Plan.GetAvailablePlansAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetAvailablePlansAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
       
    }
}