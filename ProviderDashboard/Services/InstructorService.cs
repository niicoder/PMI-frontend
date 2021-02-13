using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.V1.Dto;
using PMI.ESP3.Provider.Client.V1.Dto.Filters;
using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProviderDashboard.Services
{
    public interface IInstructorService
    {
        Task<List<InstructorQualificationDto>> GetQualifications(int instrcutorId);
        Task<PagedResult<InstructorDetailsDto>> GetInstructorsByProvider(InstructorFilterDto filterDto);
        Task<List<AssociatedProviderDto>> GetAssociatedProviders(int instructorId);
        Task<InstructorDetailsDto> AddInstructor(InstructorRelationshipDto req);
        Task<bool> RemoveInstructor(InstructorRelationshipDto req);
        Task<bool> AssignableAsInstructor(int personId);
        Task<PagedResult<InstructorApplicationViewDto>> GetInstructorApplications(InstructorApplicationFilterDto filter);
    }


    public class InstructorService : IInstructorService
    {
        private readonly IProviderService _providerSvc;

        public InstructorService(IProviderService providerSvc, IUserService userService, ITokenService token)
        {
            _providerSvc = providerSvc;
        }

        public async Task<bool> AssignableAsInstructor(int personId)
        {
            var response = await _providerSvc.Client.Instructor.AssignableAsInstructorAsync(personId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Instructor.AssignableAsInstructor: {response.ErrorMessage}");
            }

            return response.Data;
        }

        public async Task<List<AssociatedProviderDto>> GetAssociatedProviders(int instructorId)
        {
            var result = new List<AssociatedProviderDto>();
            var response = await _providerSvc.Client.Instructor.GetAssociatedProviders(instructorId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Instructor.GetAssociatedProviders: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data.Where(x => x != null).Select(x => new AssociatedProviderDto(x)).ToList();

            return result;
        }

        public async Task<PagedResult<InstructorDetailsDto>> GetInstructorsByProvider(InstructorFilterDto filterDto)
        {
            var result = new PagedResult<InstructorDetailsDto>();
            var response = await _providerSvc.Client.Instructor.GetInstructorsByProvider(filterDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"InstructorService.GetInstructorsByProvider: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<PagedResult<InstructorApplicationViewDto>> GetInstructorApplications(InstructorApplicationFilterDto filter)
        {
            var result = new PagedResult<InstructorApplicationViewDto>();
            var response = await _providerSvc.Client.InstructorApplication.GetInstructorApplicationListAsync(filter, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.InstructorApplication.GetInstructorApplicationListAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
            {
                var res = new PagedResult<InstructorApplicationViewDto>
                {
                    Results = response.Data.Results.Select(x => new InstructorApplicationViewDto(x)).ToList(),
                    RowCount = response.Data.RowCount,
                    CurrentPage = response.Data.CurrentPage,
                    PageCount = response.Data.PageCount,
                    PageSize = response.Data.PageSize
                };
                result = res;
            }

            return result;
        }

        public async Task<List<InstructorQualificationDto>> GetQualifications(int instrcutorId)
        {
            var result = new List<InstructorQualificationDto>();
            var response = await _providerSvc.Client.Instructor.GetInstructorQualificationAsync(instrcutorId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Instructor.GetInstructorQualificationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InstructorDetailsDto> AddInstructor(InstructorRelationshipDto req)
        {
            InstructorDetailsDto result = null;
            var response = await _providerSvc.Client.Instructor.CreateInstructor(req, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Instructor.CreateInstructor: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<bool> RemoveInstructor(InstructorRelationshipDto req)
        {
            var response = await _providerSvc.Client.Instructor.RemoveInstructor(req, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Instructor.RemoveInstructor: {response.ErrorMessage}");
            }

            return response.Data;
        }
    }
}
