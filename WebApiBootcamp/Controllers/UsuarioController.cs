using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using WebApiBootcamp.Models;

namespace WebApiBootcamp.Controllers
{
    [ApiController]
    [Route("usuario")]

    public class UsuarioController : ControllerBase
    {


        static string connectionDB = @"Data Source=DESKTOP-C8APSN0\SQLEXPRESS;Initial Catalog=DB_ACCESO;Integrated Security=true;";


        [HttpGet]
        [Route("listar")]

        public dynamic ListarUsuarios()
        {
            IEnumerable<Usuario>? lst = null;
            using (var db = new SqlConnection(connectionDB))
            {
                var sql = "select IdUsuario,Correo,Clave from Usuario";
                lst = db.Query<Usuario>(sql);
            }
            return lst;
        }


        [HttpPost]
        [Route("guardar")]

        public dynamic GuardarUsuarios(Usuario usuario)
        {
            

            using (SqlConnection cn = new SqlConnection(connectionDB))
            {
                SqlCommand cmd = new SqlCommand("SP_ValidarUsuario", cn);
                cmd.Parameters.AddWithValue("Correo",usuario.Correo);
                cmd.Parameters.AddWithValue("Clave", usuario.Clave);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                usuario.IdUsuario = Convert.ToInt32(cmd.ExecuteScalar().ToString());
                
            }

            if(usuario.IdUsuario != 0)
            {
                return new
                {
                    sucess = true,
                    message = "usuario registrado",
                    result = usuario.Correo
                };
            }
            else
            {
                return new
                {
                    success = false,
                    message = "usuario no registrado",
                    result = usuario.Correo
                };
            }
        }

        
    }
}
