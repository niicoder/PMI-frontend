using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Http;

namespace ProviderDashboard.Services
{
    public class RefererTelemetryInitializer : ITelemetryInitializer
    {
        private const string HeaderNameDefault = "Referer";

        private readonly IHttpContextAccessor _httpContextAccessor;

        public RefererTelemetryInitializer(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new System.ArgumentNullException(nameof(httpContextAccessor));
        }

        public void Initialize(ITelemetry telemetry)
        {
            var context = _httpContextAccessor.HttpContext;
            if (context == null)
                return;

            //if (!(telemetry is RequestTelemetry requestTelemetry)) return;

            var telem = telemetry as ISupportProperties;
            if (context.Request.Headers.TryGetValue(HeaderNameDefault, out var value))
            {
                telem.Properties["Referer"] = value.ToString();
            }
        }
    }
}
