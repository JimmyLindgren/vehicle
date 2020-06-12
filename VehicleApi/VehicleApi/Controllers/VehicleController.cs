using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehicleApi.Models;
using VehicleApi.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VehicleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {

        private readonly VehicleService vehicleService;

        public VehicleController(VehicleService vehicleService)
        {
            this.vehicleService = vehicleService;
        }

        [HttpGet("")]
        public ActionResult<IEnumerable<Vehicle>> Get()
        {
            return vehicleService.GetAllVehicles();
        }

    }
}
