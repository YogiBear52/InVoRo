using Invoro.Api.src.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using FluentAssertions;
using Invoro.Api.src.Api;

namespace Invoro.Api.UnitTests.Services
{
    [TestClass]
    public class MongoServiceTests
    {
        #region Consts

        private static readonly string MONGO_CONNECTION_STRING_CONFIG_KEY = "MongoConnectionString";

        #endregion

        #region Tests

        #region Connection Strings

        [TestMethod]
        public void ConnectionString_Valid_ShouldWork()
        {
            // Prepare
            string connectionString = "mongodb://root:example@10.0.75.1:27017/Invoro?authSource=admin";
            Mock<IConfiguration> configurationMock = MockMongoConnectionString(connectionString);

            // Act
            MongoService mongoService = new MongoService(configurationMock.Object);
        }

        [TestMethod]
        public void ConnectionString_Empty_ShouldWork()
        {
            // Prepare
            string connectionString = string.Empty;
            Mock<IConfiguration> configurationMock = MockMongoConnectionString(connectionString);

            // Act
            Action act = () => new MongoService(configurationMock.Object);

            // Assert
            act.Should()
                .Throw<ArgumentException>()
                .WithMessage(ExceptionsApi.MongoConnectionStringIsNotConfiguredException(MONGO_CONNECTION_STRING_CONFIG_KEY).Message);
        }

        [TestMethod]
        public void ConnectionString_NotSpeficied_ShouldWork()
        {
            // Prepare
            Mock<IConfiguration> configurationMock = new Mock<IConfiguration>();

            // Act
            Action act = () => new MongoService(configurationMock.Object);

            // Assert
            act.Should()
                .Throw<ArgumentException>()
                .WithMessage(ExceptionsApi.MongoConnectionStringIsNotConfiguredException(MONGO_CONNECTION_STRING_CONFIG_KEY).Message);
        }

        [TestMethod]
        public void ConnectionString_DataBaseNameNotSpeficied_ShouldWork()
        {
            // Prepare
            string connectionString = "mongodb://root:example@10.0.75.1:27017";
            Mock<IConfiguration> configurationMock = MockMongoConnectionString(connectionString);

            // Act
            Action act = () => new MongoService(configurationMock.Object);

            // Assert
            act.Should()
                .Throw<ArgumentException>()
                .WithMessage(ExceptionsApi.MongoConnectionStringDoesntContainDataBaseNameException().Message);
        }

        #endregion

        #endregion

        #region Private Methods

        private static Mock<IConfiguration> MockMongoConnectionString(string connectionString)
        {
            Mock<IConfiguration> configurationMock = new Mock<IConfiguration>();
            configurationMock
                .Setup(_ => _.GetSection("ConnectionString")[MONGO_CONNECTION_STRING_CONFIG_KEY])
                .Returns(connectionString);

            return configurationMock;
        }

        #endregion
    }
}
