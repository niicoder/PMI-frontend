using CorrelationId;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PMI.ESP3.Framework.Utilities.Extensions;

namespace ProviderDashboard
{
    public class HttpContextHelper
    {
        private static readonly string _candidateEnvironmentName = "Candidate";

        private static IHttpContextAccessor _httpContextAccessor;
        private static ICorrelationContextAccessor _correlationContextAccessor;

        public static HttpContext Current => _httpContextAccessor.HttpContext;

        public static string BaseUrl => $"{Current.Request.Scheme}://{Current.Request.Host}{Current.Request.PathBase}";

        public static string CorrelationId
        {
            get
            {
                return _correlationContextAccessor?.CorrelationContext?.CorrelationId;
            }
        }

        public static bool IsProduction
        {
            get
            {
                var environment = System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                return environment.IsEqualTo(Environments.Production);
            }
        }

        public static bool IsCandidate
        {
            get
            {
                var environment = System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                return environment.IsEqualTo(_candidateEnvironmentName);
            }
        }

        public static string CookieDomain
        {
            get
            {
                var baseUrl = BaseUrl;
                if (baseUrl.ToLowerInvariant().Contains("localhost"))
                    return "localhost";

                return baseUrl.Substring(baseUrl.IndexOf("."));
            }
        }

        public static string Environment
        {
            get
            {
                return System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            }
        }

        internal static void Configure(IHttpContextAccessor contextAccessor, ICorrelationContextAccessor correlationContextAccessor)
        {
            _httpContextAccessor = contextAccessor;
            _correlationContextAccessor = correlationContextAccessor;
        }
    }

    public static class HttpContextExtensions
    {
        public static IApplicationBuilder UseHttpContext(this IApplicationBuilder app)
        {
            HttpContextHelper.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>(), app.ApplicationServices.GetRequiredService<ICorrelationContextAccessor>());
            return app;
        }
    }
}
