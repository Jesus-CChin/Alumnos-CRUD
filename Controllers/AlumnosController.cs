using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsAPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnosController : ControllerBase
    {
        private readonly AppDBContext _context;

        public AlumnosController(AppDBContext context)
        {
            _context = context;
        }
        // GET: api/<DataController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<alumno>>> GetAlumnos()
        {
            return await _context.alumnos.ToListAsync();
        }

        // POST: api/alumnos
        [HttpPost]
        public async Task<ActionResult<alumno>> PostAlumno(alumno alumno)
        {
            _context.alumnos.Add(alumno);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                    return Conflict();
            }
            return Ok(await _context.alumnos.ToListAsync());

        }

        // PUT: api/alumnos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlumnos(int id, alumno alumno)
        {

            if (id != alumno.Id)
            {
                return BadRequest();
            }

            _context.Entry(alumno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(await _context.alumnos.ToListAsync());
        }


        // DELETE: api/alumnos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlumno(int id)
        {

            var alumno = await _context.alumnos.FindAsync(id);
            if (alumno == null)
            {
                return NotFound();
            }

            try
            {
                _context.alumnos.Remove(alumno);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok(await _context.alumnos.ToListAsync());
        }


        private bool AlumnoExists(int id)
        {
            return _context.alumnos.Any(e => e.Id == id);
        }
    }
}
