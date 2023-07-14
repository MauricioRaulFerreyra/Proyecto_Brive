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


        static string connectionDB = @"Data Source=localhost;Initial Catalog=DB_ACCESO;User Id=sa;Password=12345OHdf%e;";

        //static string connectionDB = @"Data Source=CHEMA-PCMR\SQLEXPRESS;Initial Catalog=DB_ACCESO;Integrated Security=true;";


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

        [HttpGet]
        [Route("listarXid")]

        public dynamic ListarUsuariosXid(int Id)
        {
            return new Usuario
            {
                IdUsuario = Id,
                Correo = "mauri",
                Clave = "123"
            };
          
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

        //[HttpPost]
        //[Route("guardar")]
        //public dynamic GuardarUsuarios(Usuario usuario)
        //{
        //    if (usuario.Correo == "algo@algo.com" && usuario.Contraseña == "password") {
        //        usuario.IdUsuario = 2;
        
        //        return new
        //        {
        //            success = true,
        //            message = "Usuario registrado",
        //            result = usuario
        //        };
        //    } else {
        //        return new
        //        {
        //            success = false,
        //            message = "Correo o contraseña incorrectos"
        //        };
        //    }
        //}
    }
}
