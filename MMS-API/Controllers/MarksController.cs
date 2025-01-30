
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMS_API.Data;
using MMS_API.DTO;
using MMS_API.Models;

namespace MMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarksController : ControllerBase
    {
        private readonly AppDbContext db;
        public MarksController(AppDbContext db)
        {
            this.db = db;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Marks>> GetMarks()
        {
            var list = await db.MarkDetails.ToListAsync();
            if(list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [Authorize]
        [HttpGet("{Id}")]
        public async Task<ActionResult<Marks>> GetMark(int Id)
        {
            var list = await db.MarkDetails.FirstOrDefaultAsync(i => i.Id == Id);
            if(list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }
        [HttpPost]
        public async Task<ActionResult<Marks>> PostMark(MarksCreateDTO dto)
        {
            var data = new Marks()
            {
                Name = dto.Name,
                Rollno = dto.Rollno,
                Subjects = dto.Subjects,
                Cgpa = dto.Cgpa,
                Percentage = dto.Percentage,
            };
            db.MarkDetails.Add(data);
            await db.SaveChangesAsync();
            return Ok(data);
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult<Marks>> PutMark(int Id, MarksUpdateDTO dto)
        {
            var list = await db.MarkDetails.FirstOrDefaultAsync(i => i.Id == Id);
            if(list == null)
            {
                return NotFound();
            }
            list.Name = dto.Name;
            list.Rollno = dto.Rollno;
            list.Subjects = dto.Subjects;
            list.Cgpa = dto.Cgpa;
            list.Percentage = dto.Percentage;
            db.MarkDetails.Update(list);
            await db.SaveChangesAsync();
            return Ok(list);
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult<Marks>> DeleteMark(int Id)
        {
            var list = await db.MarkDetails.FirstOrDefaultAsync(i => i.Id == Id);
            if(list == null)
            {
                return NotFound();
            }
            db.MarkDetails.Remove(list);
            await db.SaveChangesAsync();
            return Ok(list);
        }
    }
}
