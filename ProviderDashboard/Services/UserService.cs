using System.Linq;
using System.Security.Claims;
using IdentityModel;
using ProviderDashboard.Dto;

namespace ProviderDashboard.Services
{
    public interface IUserService
    {
        int GetUserId(ClaimsPrincipal user);
        UserDto GetUserInfo(ClaimsPrincipal user);
    }
    
    public class UserService : IUserService
    {
        public int GetUserId(ClaimsPrincipal user)
        {
            var userId = 0;
            if (user.Identity.IsAuthenticated)
            {
                var idClaim = user.Claims.FirstOrDefault(c => c.Type.Equals(JwtClaimTypes.Id));
                if (idClaim != null)
                    int.TryParse(idClaim.Value, out userId);
            }
            return userId;
        }
        
        public UserDto GetUserInfo(ClaimsPrincipal user)
        {
            var userId = 0;
            if (user.Identity.IsAuthenticated)
            {
                var idClaim = user.Claims.FirstOrDefault(c => c.Type.Equals(JwtClaimTypes.Id));
                if (idClaim != null)
                    int.TryParse(idClaim.Value, out userId);
            }
            
            var username = "";
            if (user.Identity.IsAuthenticated)
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type.Equals(JwtClaimTypes.Name) || c.Type.Equals(ClaimTypes.Name));
                if (claim != null)
                    username = claim.Value;
            }
            
            var email = "";
            if (user.Identity.IsAuthenticated)
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type.Equals(JwtClaimTypes.Email) || c.Type.Equals(ClaimTypes.Email));
                if (claim != null)
                    email = claim.Value;
            }

            return new UserDto
            {
                Id = userId,
                Email = email,
                Username = username
            };
        }
    }
}