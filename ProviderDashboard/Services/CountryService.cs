using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface ICountryService
    {
        Task<List<CountryDto>> GetCountries();
    }
    
    public class CountryService : ICountryService
    {
        private readonly IProviderService _providerSvc;

        public CountryService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<List<CountryDto>> GetCountries()
        {
            var result = new List<CountryDto>();
            var response = await _providerSvc.Client.Lookup.GetCountriesAsync(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.GetCountriesAsync: {response.ErrorMessage}");
            }
            
            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }       
      
    }
}