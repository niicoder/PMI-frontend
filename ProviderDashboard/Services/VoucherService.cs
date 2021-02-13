using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IVoucherService
    {
        
        Task<List<VoucherDto>> GetVouchers(int providerId);
        Task<List<VoucherDto>> GetAllVouchers();
        Task<VoucherDto> GetVoucher(Guid voucherId);
        Task<VoucherDto> ReleaseVoucher(Guid voucherId);
        Task<VoucherDto> GetVoucherByApplicationId(Guid appId);
        Task<VoucherDto> AssignVoucherToInstructor(VoucherAssignDto req);
        Task<VoucherDto> UpsertVoucher(VoucherDto req);
    }


    public class VoucherService : IVoucherService
    {
        private readonly IProviderService _providerSvc;

        public VoucherService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<VoucherDto> GetVoucherByApplicationId(Guid appId)
        {
            var result = new VoucherDto();
            var response = await _providerSvc.Client.Voucher.GetVoucherByApplicationAsync(appId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.GetVoucherByApplicationAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<VoucherDto> GetVoucher(Guid voucherId)
        {
            var result = new VoucherDto();
            var response = await _providerSvc.Client.Voucher.GetVoucherAsync(voucherId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.GetVoucherListAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<VoucherDto> ReleaseVoucher(Guid voucherId)
        {
            var result = new VoucherDto();
            var response = await _providerSvc.Client.Voucher.ReleaseVoucherAsync(voucherId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.ReleaseVoucherAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<VoucherDto> AssignVoucherToInstructor(VoucherAssignDto req)
        {
            var result = new VoucherDto();

            var response = await _providerSvc.Client.Voucher.AssignVoucherAsync(req, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.GetVoucherListAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<List<VoucherDto>> GetVouchers(int providerId)
        {
            var result = new List<VoucherDto>();
            var response = await _providerSvc.Client.Voucher.GetVoucherListAsync(providerId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.GetVoucherListAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<List<VoucherDto>> GetAllVouchers()
        {
            var result = new List<VoucherDto>();
            var response = await _providerSvc.Client.Voucher.GetVouchersAsync(HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.GetVouchersAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<VoucherDto> UpsertVoucher(VoucherDto req)
        {
            var result = new VoucherDto();
            var response = await _providerSvc.Client.Voucher.UpsertVoucherAsync(req, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"ProviderService.Voucher.UpsertVoucherAsync: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }
    }
}
