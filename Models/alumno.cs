using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsAPP.Models
{
    public class alumno
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Nombre { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string App1 { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string App2 { get; set; }

        [Column(TypeName = "char(1)")]
        public string Grado { get; set; }

        [Column(TypeName = "char(1)")]
        public string Grupo { get; set; }

        public string Imagen { get; set; }

        [Column(TypeName = "char(1)")]
        public string Estatus { get; set; }
    }
}
