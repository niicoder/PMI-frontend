using PMI.ESP3.Provider.Client.V1.Dto;
using System.Text;

namespace ProviderDashboard.Dto
{
    public class AssociatedProviderDto
    {
        public int Id { get; set; }
        public string ProviderName { get; set; }
        public string ContactInformation { get; set; }
        public string Status { get; set; }

        public AssociatedProviderDto(InstructorAssociatedProvidersDto apiDto)
        {
            var strB = new StringBuilder($"{apiDto.ContactFirstName} {apiDto.ContactLastName}");
            if (!string.IsNullOrWhiteSpace(apiDto.Address1)) strB.Append($"\n{apiDto.Address1}");
            if (!string.IsNullOrWhiteSpace(apiDto.City)) strB.Append($"\n{apiDto.City}");
            if (!string.IsNullOrWhiteSpace(apiDto.State)) strB.Append($", {apiDto.State}");
            if (!string.IsNullOrWhiteSpace(apiDto.PostalCode)) strB.Append($", {apiDto.PostalCode}");

            Id = apiDto.PartyId;
            ProviderName = apiDto.Name;
            ContactInformation = strB.ToString();
            Status = apiDto.ProviderStatusType;
        }
    }
}
