using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VehicleApi.Models
{

    public class Customer
    {

        public String Name { get; }
        public String Address { get; }

        public Customer(String name, String address)
        {
            Name = name;
            Address = address;
        }
    
    }
}
