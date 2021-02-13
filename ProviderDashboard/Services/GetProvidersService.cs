using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IGetProvidersService
    {
        //Task<List<ProviderDto>> GetMyProviders();
        //Task<ProviderDto> GetProvider(string providerId);
        Task<CoreProviderDto> GetProviderFromCore(string providerId);
    }

    public class GetProvidersService : IGetProvidersService
    {
        private readonly IProviderService _providerSvc;

        public GetProvidersService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }


        //public async Task<List<ProviderDto>> GetMyProviders()
        //{
        //    var result = new List<ProviderDto>();
        //    var response = await _providerSvc.Client.Provider.GetMyProvidersAsync(HttpContextHelper.CorrelationId);
        //    if (response != null && !response.RestResponse.IsSuccessful)
        //    {
        //        throw new Exception($"ProviderService.Provider.GetMyProvidersAsync: {response.ErrorMessage}");
        //    }
            
        //    if (response != null && response.Data != null)
        //        result = response.Data;

        //    return result;
        //}

        //public async Task<ProviderDto> GetProvider(string providerId)
        //{
        //    ProviderDto result = null;
        //    var response = await _providerSvc.Client.Provider.GetProviderAsync(providerId, HttpContextHelper.CorrelationId);
        //    if (response != null && !response.RestResponse.IsSuccessful)
        //    {
        //        throw new Exception($"ProviderService.GetProviderAsync: {response.ErrorMessage}");
        //    }
            
        //    if (response != null && response.Data != null)
        //        result = response.Data;

        //    return result;
        //}

        public async Task<CoreProviderDto> GetProviderFromCore(string coreProviderId)
        {
            CoreProviderDto result = null;
            var response = await _providerSvc.Client.Provider.GetProviderFromCoreAsync(coreProviderId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetProviderAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
    }
}