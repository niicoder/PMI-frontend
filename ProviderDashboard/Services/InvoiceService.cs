using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMI.ESP3.Provider.Client.V1.Dto;

namespace ProviderDashboard.Services
{
    public interface IInvoiceService
    {
        Task<InvoiceDto> IssueInvoice(InvoiceDto invoice);
        Task<InvoiceDto> MarkT3InvoicePaid(InvoiceDto invoice);
        Task<bool> HasInvoice(Guid applicationId);
        Task<InvoiceDto> GetInvoice(Guid applicationId);
        Task<InvoiceDto> SyncATPStatus(InvoiceDto invoice);
    }

    public class InvoiceService : IInvoiceService
    {
        private readonly IProviderService _providerSvc;

        public InvoiceService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }

        public async Task<bool> HasInvoice(Guid applicationId)
        {

            var response = await _providerSvc.Client.Invoice.GetInvoiceByApplicationId(applicationId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                if (response.RestResponse.StatusCode == System.Net.HttpStatusCode.NotFound) return false;

                throw new Exception($"InvoiceService.HasInvoice: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                return response.Data != default;

            return false;
        }

        public async Task<InvoiceDto> GetInvoice(Guid applicationId)
        {
            var response = await _providerSvc.Client.Invoice.GetInvoiceByApplicationId(applicationId, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                if (response.RestResponse.StatusCode == System.Net.HttpStatusCode.NotFound) return null;
                throw new Exception($"InvoiceService.GetInvoice: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                return response.Data;

            return null;
        }

        public async Task<InvoiceDto> IssueInvoice(InvoiceDto invoice)
        {

            // issue invoice if invoice does not exist
            if (!await HasInvoice(invoice.ApplicationId))
            {
                InvoiceDto result = null;

                var response = await _providerSvc.Client.Invoice.IssueInvoice(invoice.ApplicationId, invoice.ApplicationTypeId, HttpContextHelper.CorrelationId);
                if (response != null && !response.RestResponse.IsSuccessful)
                {
                    throw new Exception($"InvoiceService.IssueInvoice: {response.ErrorMessage}");
                }

                if (response != null && response.Data != null)
                    result = response.Data;

                return result;
            }
            else
            {
                throw new Exception($"InvoiceService.IssueInvoice: Invoice already exists");
            }
        }

        public async Task<InvoiceDto> MarkT3InvoicePaid(InvoiceDto invoiceDto)
        {
            var updateRes = await _providerSvc.Client.Invoice.UpdateInvoiceReferenceId(invoiceDto.Id, invoiceDto.ReferenceId, HttpContextHelper.CorrelationId);
            if (updateRes != null && !updateRes.RestResponse.IsSuccessful)
            {
                throw new Exception($"InvoiceService.MarkT3InvoicePaid: {updateRes.ErrorMessage}");
            }

            InvoiceDto result = null;

            InvoicePaymentDto paymentDto = new InvoicePaymentDto
            {
                InvoiceId = invoiceDto.Id,
                PaidDate = invoiceDto.PaidDate.Value,
                AmountPaid = invoiceDto.AmountPaid.Value,
            };

            var response = await _providerSvc.Client.Invoice.MarkInvoicePaid(paymentDto, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"InvoiceService.MarkT3InvoicePaid: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task<InvoiceDto> SyncATPStatus(InvoiceDto invoice)
        {
            InvoiceDto result = null;
            // issue invoice if invoice does not exist
            if (!await HasInvoice(invoice.ApplicationId))
            {
                var response = await _providerSvc.Client.Invoice.IssueInvoice(invoice.ApplicationId, invoice.ApplicationTypeId, HttpContextHelper.CorrelationId);
                if (response != null && !response.RestResponse.IsSuccessful)
                {
                    throw new Exception($"InvoiceService.SyncATPStatus: {response.ErrorMessage}");
                }

                if (response != null && response.Data != null)
                    result = response.Data;
            }
            else
            {
                var response = await _providerSvc.Client.Invoice.GetInvoiceByApplicationId(invoice.ApplicationId);
                if (response == default || response.Data == default)
                    throw new Exception($"InvoiceService.SyncATPStatus: Invoice not found for Id {invoice.Id}");

                result = response.Data;

                result.ReferenceId = invoice.ReferenceId;
                result = (await _providerSvc.Client.Invoice.UpdateInvoiceReferenceId(result.Id, result.ReferenceId, HttpContextHelper.CorrelationId))?.Data;
            }

            if (result != null && result.Id != Guid.Empty)
            {
                InvoicePaymentDto invoicePayment = new InvoicePaymentDto
                {
                    InvoiceId = result.Id,
                    AmountPaid = invoice.AmountPaid.Value,
                    PaidDate = invoice.PaidDate.Value
                };

                // update with info from CRM if provided
                var response = await _providerSvc.Client.Invoice.MarkInvoicePaid(invoicePayment, HttpContextHelper.CorrelationId);
                if (response != null && !response.RestResponse.IsSuccessful)
                {
                    throw new Exception($"InvoiceService.SyncATPStatus: {response.ErrorMessage}");
                }

                if (response != null && response.Data != null)
                    result = response.Data;
            }

            return result;
        }

    }
}