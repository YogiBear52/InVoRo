using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.Extensions.Primitives;
using Invoro.Api.src.Authentication;
using FluentAssertions;
using Invoro.Api.src.Api;

namespace Invoro.Api.UnitTests.Authentication
{
    [TestClass]
    public class AuthenticationServiceTests
    {
        #region Tests

        #region Ctor

        [TestMethod]
        public void Ctor_HeadersContainAuthorizationHeader_ShouldCreateUser()
        {
            // Prepare
            string authorizationHeaderValue = "MyUserIdentifier";

            IHttpContextAccessor httpContextAccessor = 
                MockHttpContextWithAuthorizationHeader(authorizationHeaderValue);

            // Act
            AuthenticationService authenticationService =
                new AuthenticationService(httpContextAccessor);

            // Assert
            Assert.IsNotNull(authenticationService.User);
            Assert.AreEqual(
                authenticationService.User.Identifier, new User(authorizationHeaderValue).Identifier);
        }

        [TestMethod]
        public void Ctor_HeadersDoesntContainAuthorizationHeader_UserShouldBeEmpty()
        {
            // Prepare
            IHttpContextAccessor httpContextAccessor =
                MockHttpContextWithoutAuthorizationHeader();

            // Act
            AuthenticationService authenticationService =
                new AuthenticationService(httpContextAccessor);

            // Assert
            Assert.IsNull(authenticationService.User);
        }

        #endregion

        #region ValidateUser

        [TestMethod]
        public void Ctor_UserExists_ShouldPass()
        {
            // Prepare
            string authorizationHeaderValue = "MyUserIdentifier";

            IHttpContextAccessor httpContextAccessor =
                MockHttpContextWithAuthorizationHeader(authorizationHeaderValue);

            AuthenticationService authenticationService =
                new AuthenticationService(httpContextAccessor);

            // Act
            Action action = () => authenticationService.ValidateUser();

            action.Should().NotThrow();
        }

        [TestMethod]
        public void Ctor_UserDoesntExist_ShouldThrowException()
        {
            // Prepare
            IHttpContextAccessor httpContextAccessor =
                MockHttpContextWithoutAuthorizationHeader();

            AuthenticationService authenticationService =
                new AuthenticationService(httpContextAccessor);

            // Act

            Action action = () => authenticationService.ValidateUser();

            // Assert
            action.Should()
                .Throw<InvalidOperationException>()
                .WithMessage(ExceptionsApi.AuthenticationHeaderIsEmptyException("Authorization").Message);
        }

        #endregion

        #endregion

        #region Private Methods

        private static IHttpContextAccessor MockHttpContextWithAuthorizationHeader(string authorizationHeaderValue)
        {
            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            DefaultHttpContext context = new DefaultHttpContext();
            mockHttpContextAccessor.SetupGet(_ => _.HttpContext).Returns(context);

            context.Request.Headers["Authorization"] = authorizationHeaderValue;

            return mockHttpContextAccessor.Object;
        }

        private static IHttpContextAccessor MockHttpContextWithoutAuthorizationHeader()
        {
            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            mockHttpContextAccessor.SetupGet(_ => _.HttpContext).Returns(new DefaultHttpContext());

            return mockHttpContextAccessor.Object;
        }

        #endregion
    }
}