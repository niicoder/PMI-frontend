using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IOperationsService
    {
        Task SyncProvider(string providerNumber);
        Task SyncInstructor(int instructorId);
    }
    
    public class OperationsService : IOperationsService
    {
        private readonly IProviderService _providerSvc;

        public OperationsService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task SyncProvider(string providerNumber)
        {
            var response = await _providerSvc.Client.LogicalOperations.QueueProviderAsync(providerNumber, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"OperationsService.SyncProvider: {response.ErrorMessage}");
            }
        }

        public async Task SyncInstructor(int instructorId)
        {
            var response = await _providerSvc.Client.LogicalOperations.QueueInstructorAsync(instructorId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"OperationsService.SyncInstructor: {response.ErrorMessage}");
            }
        }

    }
}