using Invoro.Api.src.Api;
using Microsoft.AspNetCore.Http;

namespace Invoro.Api.src.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        #region Consts

        private const string AUTHORIZATION_HEADER_NAME = "Authorization";

        #endregion

        public AuthenticationService(IHttpContextAccessor httpContextAccessor)
        {
            string authHeader = ExtractAuthorizationHeaderOrNull(httpContextAccessor);

            if (string.IsNullOrEmpty(authHeader))
            {
                this.User = null;
                return;
            }

            this.User = CreateNewUserFromAuthorizationHeader(authHeader);
        }

        #region Public

        public User User { get; private set; }

        public void ValidateUser()
        {
            if (this.User != null)
            {
                return;
            }

            throw ExceptionsApi.AuthenticationHeaderIsEmptyException(AUTHORIZATION_HEADER_NAME);
        }

        #endregion

        #region Private Methods

        private static string ExtractAuthorizationHeaderOrNull(IHttpContextAccessor httpContextAccessor)
        {
            return httpContextAccessor.HttpContext.Request.Headers[AUTHORIZATION_HEADER_NAME];
        }

        private static User CreateNewUserFromAuthorizationHeader(string authHeader)
        {
            string userIdentifier = authHeader;

            return new User(userIdentifier);
        }

        #endregion
    }

    public interface IAuthenticationService
    {
        User User { get; }

        void ValidateUser();
    }
}
