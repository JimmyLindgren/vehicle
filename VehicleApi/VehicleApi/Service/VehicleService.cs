using System;
using System.Collections.Generic;
using VehicleApi.Models;

namespace VehicleApi.Service
{
    public class VehicleService
    {

        private readonly List<Vehicle> vehicles = new List<Vehicle>();

        public VehicleService()
        {
            InitVehicles();
        }

        private void InitVehicles()
        {
            Customer kalle = new Customer("Kalles Grustransporter AB", "Cementvägen 8, 111 11 Södertälje");
            vehicles.AddRange(new List<Vehicle> {
                new Vehicle("YS2R4X20005399401", "ABC123", kalle),
                new Vehicle("VLUR4X20009093588", "DEF456", kalle),
                new Vehicle("VLUR4X20009048066", "GHI789", kalle)
            });

            Customer johan = new Customer("Johans Bulk AB ", "Balkvägen 12, 222 22 Stockholm");
            vehicles.AddRange(new List<Vehicle> {
                new Vehicle("YS2R4X20005388011", "JKL012", johan),
                new Vehicle("YS2R4X20005387949", "MNO345", johan),
            });

            Customer harald = new Customer("Haralds Värdetransporter AB", "Budgetvägen 1, 333 33 Uppsala ");
            vehicles.AddRange(new List<Vehicle> {
                new Vehicle("YS2R4X20005387765", "PQR678", harald),
                new Vehicle("YS2R4X20005387055", "STU901", harald),
            });

        }

        public List<Vehicle> GetAllVehicles() {
            return vehicles;
        }

        public bool UpdateStatusForVehicle(String vehicleId, Status newStatus) {
            Vehicle vehicleToUpdate = vehicles.Find(vehicle => vehicle.VehicleId == vehicleId);

            bool successfulUpdate = false;
            
            if (vehicleToUpdate != null) {
                vehicleToUpdate.Status = newStatus;
                successfulUpdate = true;
            }

            return successfulUpdate;
        }

    }
}
