using Microsoft.EntityFrameworkCore;
using TestForSmol.Models;

namespace TestForSmol.Data
{
    public class MyContext : DbContext
    {
        public DbSet<StarSystem> StarSystems { get; set; }
        public DbSet<SpaseObject> SpaseObjects { get; set; }
        public MyContext(DbContextOptions<MyContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
