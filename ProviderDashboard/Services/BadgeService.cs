using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IBadgeService
    {
        Task<BadgeDto> IssueBadge(BadgeRequestDto badgeDto);
    }

    public class BadgeService : IBadgeService
    {
        private readonly IProviderService _providerSvc;

        public BadgeService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<BadgeDto> IssueBadge(BadgeRequestDto badgeDto)
        {
            var response = await _providerSvc.Client.BadgeProvider.IssueBadgeAsync(badgeDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                var errorMessage = response.ErrorMessage;
                if (response.RestResponse != null)
                {
                    errorMessage = JsonConvert.DeserializeObject<string>(response.RestResponse.Content);
                }

                throw new Exception($"BadgeService.IssueBadge: {errorMessage}");
            }

            return response.Data;
        }
    }
}