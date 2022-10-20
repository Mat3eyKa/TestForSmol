using System;
using System.ComponentModel.DataAnnotations;

namespace TestForSmol.Models
{
    public class SpaseObject
    {
        public int Id { get; set; }

        [StringLength(80, MinimumLength = 1)]
        public string SpaseObjectName { get; set; }
        public string TypeObject { get; set; }
        public double Diameter { get; set; }
        public double Mass { get; set; }
        public StarSystem StarSystem { get; set; }
    }
}
