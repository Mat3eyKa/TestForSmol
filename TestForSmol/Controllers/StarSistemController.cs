using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestForSmol.Data;
using TestForSmol.Models;

namespace TestForSmolensk.Controllers
{
    [ApiController]
    [Route("api/StarSystems/[action]")]
    public class StarSistemController : ControllerBase
    {
        readonly MyContext db;
        public StarSistemController(MyContext context) =>      
           db = context;
        
        [HttpGet]
        public async Task<IEnumerable<StarSystem>> Get() =>  await db.StarSystems.ToListAsync();

        [HttpGet("{id}")]
        public async Task<StarSystem> Get(int id) => await db.StarSystems.FirstOrDefaultAsync(x => x.Id == id);

        [HttpGet("{id}")]
        public async Task<IEnumerable<string>> GetObjectsName(int id) =>
             await db.SpaseObjects.Where(x => x.StarSystem.Id == id)
               .Where(x => x.TypeObject == "Звезда" || x.TypeObject == "Черная дыра")
               .Select(x => x.SpaseObjectName).ToListAsync();

        [HttpPost]
        public async Task<ActionResult> Post(StarSystem starSystem)
        {
            if (ModelState.IsValid)
            {
                db.StarSystems.Add(starSystem);
                await db.SaveChangesAsync();
                return Ok(starSystem);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public async Task<ActionResult> Put(StarSystem starSystem)
        {
            if (ModelState.IsValid)
            {
                db.Update(starSystem);
                await db.SaveChangesAsync();
                return Ok(starSystem);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            StarSystem starSystem = db.StarSystems.Include(x=>x.SpaseObjects).FirstOrDefault(x => x.Id == id);
            if (starSystem != null)
            {
                db.SpaseObjects.RemoveRange(starSystem.SpaseObjects);
                db.StarSystems.Remove(starSystem);
                await db.SaveChangesAsync();
            }
           return Ok();
        }
    }
}
