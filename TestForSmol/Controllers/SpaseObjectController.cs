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
    [Route("api/SpaseObjects/[action]")]
    public class SpaseObjectController : ControllerBase
    {
        readonly MyContext db;
        public SpaseObjectController(MyContext context) =>
            db = context;

        [HttpGet]
        public async Task<IEnumerable<SpaseObject>> Get() => await db.SpaseObjects.ToListAsync();

        [HttpGet("{id}")]
        public async Task<IEnumerable<SpaseObject>> GetId(int id) => await db.SpaseObjects.Where(x => x.StarSystem.Id == id).ToListAsync();

        [HttpGet("{id}")]
        public async Task<SpaseObject> Get(int id) => await db.SpaseObjects.FirstOrDefaultAsync(x => x.Id == id);

        [HttpPost]
        public async Task<ActionResult> Post(SpaseObject spaseObject)
        {
            if (ModelState.IsValid)
            {
                db.SpaseObjects.Add(spaseObject);
                await db.SaveChangesAsync();
                return Ok(spaseObject);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> PostWithID(SpaseObject spaseObject, int id)
        {
            if (ModelState.IsValid)
            {
                var starSys = await db.StarSystems.FirstOrDefaultAsync(x => x.Id == id);
                if (starSys == null)
                    return BadRequest();

                starSys.SpaseObjects.Add(spaseObject);
                await db.SaveChangesAsync();
                spaseObject.StarSystem = null;
                return Ok(spaseObject);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public async Task<ActionResult> Put(SpaseObject spaseObject)
        {
            if (ModelState.IsValid)
            {
                db.Update(spaseObject);
                await db.SaveChangesAsync();
                return Ok(spaseObject);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var spaseObject = await db.SpaseObjects.FirstOrDefaultAsync(x => x.Id == id);
            if (spaseObject != null)
            {
                db.SpaseObjects.Remove(spaseObject);
                await db.SaveChangesAsync();
            }
            return Ok(spaseObject);
        }
    }
}
