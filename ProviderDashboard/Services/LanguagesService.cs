using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface ILanguageService
    {
        Task<List<LanguageDto>> GetLanguages();
    }
    
    public class LanguageService : ILanguageService
    {
        private readonly IProviderService _providerSvc;

        public LanguageService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<List<LanguageDto>> GetLanguages()
        {
            var result = new List<LanguageDto>();
            var response = await _providerSvc.Client.Lookup.GetLanguages(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetLanguages: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }       
      
    }
}