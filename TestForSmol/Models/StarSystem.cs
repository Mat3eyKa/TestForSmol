using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestForSmol.Models
{
    public class StarSystem
    {
        public int Id { get; set; }

        [StringLength(80, MinimumLength = 1)]
        public string StarSystemName { get; set; }

        public long Age { get; set; }
        public string CenterOfGravity { get; set; } = "Не выбрано";
        public List<SpaseObject> SpaseObjects { get; set; } = new List<SpaseObject>();
    }
}
