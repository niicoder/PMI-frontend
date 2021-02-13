using System;
using CorrelationId;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.Options;
using ProviderDashboard.Options;
using ProviderDashboard.Services;

namespace ProviderDashboard
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        readonly string CorsPolicy = "AnyOrigin";

        public void ConfigureServices(IServiceCollection services)
        {
            // The following line enables Application Insights telemetry collection.
            services.AddApplicationInsightsTelemetry();

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

            var idpUrl = _configuration.GetValue<string>("AppSettings:IDPUrl");
            var providerApiUrl = _configuration.GetValue<string>("AppSettings:ProviderApiUrl");

            // CORS
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                builder =>
                {
                    builder.AllowAnyOrigin();
                    //builder.AllowAnyOrigin()
                    //        .AllowAnyMethod()
                    //        .AllowAnyHeader();
                });
            });

            // AUTHENTICATION
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = true;
                    options.Authority = idpUrl;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidIssuer = idpUrl
                    };
                });

            services.AddAuthorization();

            services.AddHttpClient("main", options =>
            {
                options.BaseAddress = new Uri(providerApiUrl);
            });
            services.AddHttpContextAccessor();

            services.Configure<AppSettingsOptions>(_configuration.GetSection("AppSettings"));
            services.Configure<ProviderServiceOptions>(_configuration.GetSection("ProviderService"));
            services.AddSingleton(x => x.GetRequiredService<IOptions<ProviderServiceOptions>>().Value);
            services.Configure<BadgeSettingsOptions>(_configuration.GetSection("BadgeSettings"));
            services.AddSingleton(x => x.GetRequiredService<IOptions<BadgeSettingsOptions>>().Value);

            // SERVICES
            services.AddSingleton<ITelemetryInitializer, RefererTelemetryInitializer>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IPlanService, PlanService>();
            services.AddSingleton<IApplicationService, ApplicationService>();
            services.AddSingleton<IInvoiceService, InvoiceService>();
            services.AddSingleton<IProviderService, ProviderService>();
            services.AddSingleton<ICountryService, CountryService>();
            services.AddSingleton<ILanguageService, LanguageService>();
            services.AddSingleton<IGetProvidersService, GetProvidersService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.AddSingleton<IInstructorService, InstructorService>();
            services.AddSingleton<IInstructorDocumentService, InstructorDocumentService>();

            services.AddSingleton<IProcessingNoteService, ProcessingNoteService>();
            services.AddSingleton<ITrainingEventService, TrainingEventService>();

            services.AddSingleton<IVoucherService, VoucherService>();
            services.AddSingleton<IInstructorApplicationService, InstructorApplicationService>();
            services.AddSingleton<IAccessService, AccessService>();
            services.AddSingleton<IProviderRelationshipService, ProviderRelationshipService>();
            services.AddSingleton<IApplicationRequirementService, ApplicationRequirementService>();
            services.AddSingleton<IBadgeService, BadgeService>();
            services.AddSingleton<IOperationsService, OperationsService>();

            // Add CorrelationId
            services.AddCorrelationId();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseHttpContext();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(CorsPolicy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}