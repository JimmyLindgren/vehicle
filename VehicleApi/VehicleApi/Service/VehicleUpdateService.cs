using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VehicleApi.Models;

namespace VehicleApi.Service
{
    public class VehicleUpdateService : IHostedService, IDisposable
    {

        private readonly VehicleService VehicleService;

        private Timer timer;

        public VehicleUpdateService(VehicleService vehicleService)
        {
            VehicleService = vehicleService;
        }
        
        public Task StartAsync(CancellationToken stoppingToken)
        {
            timer = new Timer(UpdateVehicleStatuses, null, TimeSpan.Zero,
            TimeSpan.FromSeconds(10));

            return Task.CompletedTask;
        }

        private void UpdateVehicleStatuses(object state)
        {
            List<Vehicle> vehicles = VehicleService.GetAllVehicles();
            Random randomGenerator = new Random();

            // Simulate that we try to get status report from each vehicle.
            vehicles.ForEach(vehicle =>  VehicleService.UpdateStatusForVehicle(vehicle.VehicleId, 
                (Status)randomGenerator.Next((int)Status.Unknown, (int)Status.Connected + 1)));
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            timer?.Dispose();
        }
    }
   
}
