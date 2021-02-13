
using System;

namespace ProviderDashboard.Dto
{
    public class InvoiceDataDto
    {
        public Guid ApplicationId { get; set; }
        public int ApplicationTypeId { get; set; }
        public string ReferenceId { get; set; }
        public decimal InvoiceAmount { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string PaidDate { get; set; }
        public string AmountPaid { get; set; }

    }
}
