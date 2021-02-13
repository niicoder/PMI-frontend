using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.Options;
using PMI.ESP3.Provider.Client.V1;

namespace ProviderDashboard.Services
{
    public interface IProviderService
    {   
        IProviderClient Client { get; }
    }
    
    public class ProviderService : IProviderService
    {        
        private readonly ProviderServiceOptions _providerSvcOptions;
        private readonly ITokenService  _tokenSvc;

        public ProviderService(ProviderServiceOptions providerSvcOptions, ITokenService tokenSvc)
        {            
            _providerSvcOptions = providerSvcOptions;
            _tokenSvc = tokenSvc;
        }

        public IProviderClient Client
        {
            get
            {   
                return new ProviderClient(_providerSvcOptions.ServiceUrl, _tokenSvc.GetAccessToken(), _providerSvcOptions.OcpApimSubscriptionKey);                    
            }
        }
    }
}