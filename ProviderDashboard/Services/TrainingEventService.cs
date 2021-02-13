using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.Options;
using PMI.ESP3.Provider.Client.V1;
using PMI.ESP3.Provider.Client.V1.Dto;
using PMI.ESP3.Provider.Client.V1.Dto.Filters;
using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProviderDashboard.Services
{
    public interface ITrainingEventService
    {
        Task<List<TrainingEventDto>> GetTrainingEvents(TrainingEventFilter filter);
        Task<TrainingEventDto> GetTrainingEventByID(Guid eventId);
        Task<TrainingEventDto> AddTrainingEvent(TrainingEventDto trainingEvent);
        Task<TrainingEventDto> UpdateTrainingEvent(TrainingEventDto trainingEvent);
        Task<TrainingEventRegistrationDto> RegisterTrainingEvent(TrainingEventRegistrationDto trainingEvent);
        Task<string> GetTrainingEventLoginLink(Guid eventRegistrationId);
        Task<int> EventAttendance(string refId);
        Task<int> EventAssessments(string refId);
        Task DeleteTrainingEvent(Guid eventId);
        Task<List<TrainingEventRegistrationDto>> GetTrainingEventRegisterations(Guid appId);
        Task<List<ModalityDto>> GetModalities();
    }

    public class TrainingEventService : ITrainingEventService
    {
        private readonly IProviderService _providerSvc;

        public TrainingEventService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<List<ModalityDto>> GetModalities()
        {
            List<ModalityDto> result = null;
            var response = await _providerSvc.Client.Event.GetModalities(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.GetModalities: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }


        public async Task<List<TrainingEventRegistrationDto>> GetTrainingEventRegisterations(Guid appId)
        {
            List<TrainingEventRegistrationDto> result = null;
            var response = await _providerSvc.Client.Event.GetTrainingEventRegistrationsAsync(appId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.GetTrainingEventRegisterations: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<List<TrainingEventDto>> GetTrainingEvents(TrainingEventFilter filter)
        {
            List<TrainingEventDto> result = null;
            var response = await _providerSvc.Client.Event.GetTrainingEventsAsync(filter);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.GetTrainingEvents: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<TrainingEventDto> GetTrainingEventByID(Guid eventId)
        {
            TrainingEventDto result = null;
            var response = await _providerSvc.Client.Event.GetTrainingEventByIDAsync(eventId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.GetTrainingEvents: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
            throw new NotImplementedException();
        }

        public async Task<TrainingEventDto> AddTrainingEvent(TrainingEventDto trainingEvent)
        {
            TrainingEventDto result = null;
            var response = await _providerSvc.Client.Event.AddTrainingEventAsync(trainingEvent, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.AddTrainingEvent: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<TrainingEventDto> UpdateTrainingEvent(TrainingEventDto trainingEvent)
        {
            TrainingEventDto result = null;
            var response = await _providerSvc.Client.Event.UpdateTrainingEventAsync(trainingEvent, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.UpdateTrainingEvent: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<TrainingEventRegistrationDto> RegisterTrainingEvent(TrainingEventRegistrationDto trainingEvent)
        {
            TrainingEventRegistrationDto result = null;

            var response = await _providerSvc.Client.Event.RegisterTrainingEventAsync(trainingEvent.ApplicationId, trainingEvent.ReferenceId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"{response.RestResponse.Content}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<string> GetTrainingEventLoginLink(Guid eventRegistrationId)
        {
            var response = await _providerSvc.Client.Event.GetTrainingEventLoginLink(eventRegistrationId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.GetTrainingEventLoginLink: {response.ErrorMessage}");
            }

            return response.Data;
        }

        public async Task<int> EventAttendance(string refId)
        {
            var response = await _providerSvc.Client.Event.EventAttendance(refId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.EventAttendance: {response.ErrorMessage}");
            }

            return response.Data;
        }

        public async Task<int> EventAssessments(string refId)
        {
            var response = await _providerSvc.Client.Event.EventAssessments(refId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.EventAssessments: {response.ErrorMessage}");
            }

            return response.Data;
        }

        public async Task DeleteTrainingEvent(Guid eventId)
        {
            var response = await _providerSvc.Client.Event.DeleteTrainingEventAsync(eventId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"TrainingEventService.DeleteTrainingEvent: {response.ErrorMessage}");
            }
        }

    }
}
