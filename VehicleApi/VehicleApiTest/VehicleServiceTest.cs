using Microsoft.VisualStudio.TestTools.UnitTesting;
using VehicleApi.Models;
using VehicleApi.Service;

namespace VehicleApiTest
{
    [TestClass]
    public class VehicleServiceTest
    {
        [TestMethod]
        public void GetAllVehiclesReturnsVehicles()
        {

            var vehicleService = new VehicleService();
            var result = vehicleService.GetAllVehicles();

            Assert.AreEqual(7, result.Count);
        }

        [TestMethod]
        public void CanUpdateStatusForVehicle()
        {
            var vehicleService = new VehicleService();
            var vehicles = vehicleService.GetAllVehicles();

            var firstVehicle = vehicles[0];

            // All vehicles is initiated with unknown status
            Assert.IsTrue(firstVehicle.Status == Status.Unknown);

            bool result = vehicleService.UpdateStatusForVehicle(firstVehicle.VehicleId, Status.Connected);

            // Vehicle is updated ok
            Assert.IsTrue(result);
            Assert.IsTrue(firstVehicle.Status == Status.Connected);
        }

        [TestMethod]
        public void UpdatingStatusForNonExistingVehicleShallReturnError()
        {
            var vehicleService = new VehicleService();

            bool result = vehicleService.UpdateStatusForVehicle("foobar", Status.Connected);

            Assert.IsFalse(result);
        }
    }
}
