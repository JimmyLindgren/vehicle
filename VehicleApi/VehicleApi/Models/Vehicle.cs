using System;

namespace VehicleApi.Models
{
    public class Vehicle
    {
        public String VehicleId { get; }

        public String RegistrationNumber { get; }

        public Customer Customer { get; }

        public Status Status { get; set; }

        public Vehicle(String vehicleId, String registrationNumber, Customer customer)
        {
            VehicleId = vehicleId;
            RegistrationNumber = registrationNumber;
            Customer = customer;
            Status = Status.Unknown;
        }

    }
}
