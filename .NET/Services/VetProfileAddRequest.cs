using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MiVet.Models.Domain.Locations;
using MiVet.Models.Domain.Practices;

namespace MiVet.Models.Domain.VetProfiles
{
    public class VetProfileV2
    {
        public int Id { get; set; }
        public List<Service> Services { get; set; }
        public LookUp ServiceTypes { get; set; }
        public string Bio { get; set; }
        public string Phone { get; set; }
        public string BusinessEmail { get; set; }      
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public User CreatedBy { get; set; }
        public List<Practice> Practices { get; set; }
        public Location Location { get; set; }
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public string EmergencyLine { get; set; }
    }
}
