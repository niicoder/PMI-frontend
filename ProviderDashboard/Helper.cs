using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace ProviderDashboard
{
    public class Helper
    {
        public const string AdminPerm = "PVRSVC:ADMA";
        public static class AtpStatus
        {
            public const string invoiceSent = "INVOICE_SENT";
        }

        public static string GetEnumName<T>(int value) where T : Enum
        {
            var enumType = typeof(T);
            var enumValue = (DisplayAttribute)enumType.GetField(Enum.GetName(enumType, value)).GetCustomAttribute(typeof(DisplayAttribute), false);
            return string.IsNullOrWhiteSpace(enumValue?.Name) ? $"{enumValue:G}" : enumValue.Name;
        }
    }
}
