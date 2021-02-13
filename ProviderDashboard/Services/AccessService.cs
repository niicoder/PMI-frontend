using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IAccessService
    {
        Task<string> GetUserType();
    }

    public class AccessService : IAccessService
    {
        private readonly IProviderService _providerSvc;

        public AccessService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<string> GetUserType()
        {
            var result = "";
            var response = await _providerSvc.Client.Access.GetUserTypeAsync(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetUserTypeAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

    }
}
