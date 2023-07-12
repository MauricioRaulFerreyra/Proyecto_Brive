using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace WebApiBootcamp.Controllers
{

    [ApiController]
    [Route("prueba")]

    public class PruebaController:ControllerBase
    {

        static string connectionDB = @"Data Source=CHEMA-PCMR\SQLEXPRESS;Initial Catalog=DB_ACCESO;Integrated Security=true;";

        [HttpGet]
        [Route("listar")]

        public dynamic ListarUsuarios()
        {
            using (var db = new SqlConnection(connectionDB))
            {
                var sql = "select IdUsuario,Correo,Clave from Usuario";
                var lst = db.Query<Usuario>(sql);

                return lst;
            }
        }

        [HttpPost]
        [Route("guardar")]

        public dynamic GuardarUsuarios(Usuario usuario)
        {
            

            using (SqlConnection cn = new SqlConnection(connectionDB))
            {
                SqlCommand cmd = new SqlCommand("SP_ValidarUsuario", cn);
                cmd.Parameters.AddWithValue("Correo", usuario.Correo);
                cmd.Parameters.AddWithValue("Clave", usuario.Clave);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                usuario.IdUsuario = Convert.ToInt32(cmd.ExecuteScalar().ToString());

            }

            if (usuario.IdUsuario != 0)
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
