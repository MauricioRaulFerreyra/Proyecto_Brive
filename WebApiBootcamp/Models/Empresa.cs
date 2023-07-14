﻿namespace WebApiBootcamp.Models
{
    public class Empresa
    {
        public int? IdEmpresa { get; set; }
        public string? Nombre { get; set; } 
        public List<string>? Vacantes { get; set; }
        public DateTime? Fecha { get; set; }
    }
}
