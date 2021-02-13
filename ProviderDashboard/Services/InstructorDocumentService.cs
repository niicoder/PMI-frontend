using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using PMI.ESP3.PMI.ESP3.Framework.Utilities;
using PMI.ESP3.Provider.Client.Options;
using PMI.ESP3.Provider.Client.V1;
using PMI.ESP3.Provider.Client.V1.Dto;
using ProviderDashboard.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ProviderDashboard.Services
{
    public interface IInstructorDocumentService
    {
        Task<List<InstructorDocumentDto>> GetInstructorDocuments(Guid appId);
        Task DeleteInstructorDocument(string filePath);
        Task<List<InstructorDocumentDto>> UploadInstructorDocument(Guid appId, string fileType, List<IFormFile> files);
    }

    public class InstructorDocumentService : IInstructorDocumentService
    {
        private readonly IProviderService _providerSvc;

        public InstructorDocumentService(IProviderService providerSvc)
        {
            _providerSvc = providerSvc;
        }
        public async Task<List<InstructorDocumentDto>> UploadInstructorDocument(Guid appId, string fileType, List<IFormFile> files)
        {
            List<InstructorDocumentDto> result = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = _providerSvc.Client.CoreClient.ClientBaseUrl;
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", GetAccessToken());

                using (var content = new MultipartFormDataContent())
                {
                    foreach (var file in files)
                    {
                        if (file.Length <= 0)
                            continue;

                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        content.Add(new StreamContent(file.OpenReadStream())
                        {
                            Headers =
                            {
                                ContentLength = file.Length,
                                ContentType = new MediaTypeHeaderValue(file.ContentType)
                            }
                        }, "files", fileName);
                    }

                    var response = await client.PostAsync("/api/Instructor/UploadInstructorDocument/" + appId.ToString() + "/" + fileType, content);
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<List<InstructorDocumentDto>>(jsonResponse);
                }

            }
            return result;
        }

        public async Task<List<InstructorDocumentDto>> GetInstructorDocuments(Guid appId)
        {
            List<InstructorDocumentDto> result = null;
            var response = await _providerSvc.Client.Instructor.GetInstructorDocumentsAsync(appId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"InstructorDocumentService.GetInstructorDocuments: {response.ErrorMessage}");
            }

            if (response != null && response.Data != null)
                result = response.Data;

            return result;
        }

        public async Task DeleteInstructorDocument(string filePath)
        {
            var response = await _providerSvc.Client.Instructor.DeleteInstructorDocumentAsync(filePath, HttpContextHelper.CorrelationId);
            if (response != null && !response.RestResponse.IsSuccessful)
            {
                throw new Exception($"InstructorDocumentService.DeleteInstructorDocument: {response.ErrorMessage}");
            }
        }

        private string GetAccessToken()
        {
            var token = HttpContextHelper.Current.Request.Headers["Authorization"].ToString().Split(" ")[1];
            return token;
        }
    }
}
