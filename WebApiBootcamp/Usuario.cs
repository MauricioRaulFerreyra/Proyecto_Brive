namespace WebApiBootcamp
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }

        public Usuario() { }
        public Usuario(int idUsuario, string correo,string clave)
        {
            this.IdUsuario = idUsuario;
            this.Correo = correo;
            this.Clave = clave;
        }
    }
}
