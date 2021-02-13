namespace ProviderDashboard.Dto
{
    public class MessageSendDto
    {
        public string AppId { get; set; }
        public string ProviderId { get; set; }
        public string InstructorId { get; set; }
        public string MessageTypeId { get; set; }
        public string MessageSubject { get; set; }
        public string MessageBody { get; set; }
    }
}