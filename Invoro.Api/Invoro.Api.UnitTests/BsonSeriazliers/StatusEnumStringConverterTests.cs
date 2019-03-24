using FluentAssertions;
using Invoro.Api.src.DataModel;
using Invoro.Api.src.DataModel.MongoCustomeSerializers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Invoro.Api.UnitTests.BsonSeriazliers
{
    [TestClass]
    public class StatusEnumStringConverterTests
    {
        #region EnumToString

        [TestMethod]
        public void ConvertEnumToString_ShouldConvertSuccessfully()
        {
            string inProgressString =
                StatusEnumStringConverter.ConvertStatusToString(Status.InProgress);

            Assert.AreEqual("InProgress", inProgressString);
        }

        #endregion

        #region StringToEnum

        [TestMethod]
        public void ConvertStringToEnum_ShouldConvertSuccessfully()
        {
            Status releasedStatus =
                StatusEnumStringConverter.ConvertStringToStatus("Released");

            Assert.AreEqual(Status.Released, releasedStatus);
        }

        [TestMethod]
        public void ConvertStringToEnum_EmptyValue_ShouldThrowException()
        {
            Action act = () =>
                StatusEnumStringConverter.ConvertStringToStatus(string.Empty);

            act.Should()
                .Throw<ArgumentNullException>();
        }

        [TestMethod]
        public void ConvertStringToEnum_NotExistingValue_ShouldThrowException()
        {
            const string NOT_EXISTING_STATUS_VALUE = "NOT_EXISTING_STATUS_VALUE";
            Action act = () =>
                StatusEnumStringConverter.ConvertStringToStatus(NOT_EXISTING_STATUS_VALUE);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage(
                    $"Cannot convert Status field with the string value of '{NOT_EXISTING_STATUS_VALUE}'" +
                    $" because it doesn't match one of the options: '{String.Join(", ", Enum.GetNames(typeof(Status)))}'");
        }

        #endregion
    }
}
