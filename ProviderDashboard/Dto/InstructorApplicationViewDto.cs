using PMI.ESP3.Provider.Client.V1.Dto;
using System;
using System.Linq;
using System.Collections.Generic;
using PMI.ESP3.Provider.Core.Enums;

namespace ProviderDashboard.Dto
{
    public class InstructorApplicationViewDto
    {
        public Guid Id { get; set; }
        public string ApplicationName { get; set; }
        public string ProviderName { get; set; }
        public string Status { get; set; }
        public string RequirementName { get; set; }
        public DateTime? RequirementDate { get; set; }
        public string RequirementDuration { get; set; }
        public List<ApplicationRequirementDto> Requirements { get; set; }

        public InstructorApplicationViewDto(InstructorApplicationDto applicationDto)
        {
            Id = applicationDto.Id;
            ApplicationName = Helper.GetEnumName<ApplicationTypeEnum>(applicationDto.ApplicationTypeId);
            ProviderName = applicationDto.ProviderName;
            Status = Helper.GetEnumName<ApplicationStatusEnum>(applicationDto.StatusId);
            if (applicationDto.TrainingEventRegistrations != null && applicationDto.TrainingEventRegistrations.Any(x => x.RegistrationDate != null))
            {
                var trEv = applicationDto.TrainingEventRegistrations.FirstOrDefault(x=>x.RegistrationDate != null);
                RequirementName = trEv?.EventName;
                RequirementDate = trEv?.RegistrationDate;
                if (trEv.RegistrationDate != null && trEv.ConfirmationDate != null)
                {
                    RequirementDuration = Convert.ToInt32((trEv.ConfirmationDate - trEv.RegistrationDate).Value.TotalHours).ToString() + "hr";
                }
            }
            Requirements = applicationDto.Requirements;
        }
    }
}
