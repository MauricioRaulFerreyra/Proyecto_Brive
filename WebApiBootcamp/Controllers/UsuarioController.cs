using Microsoft.AspNetCore.Mvc;

namespace WebApiBootcamp.Controllers
{
    [ApiController]
    [Route("usuario")]

    public class UsuarioController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]

        public dynamic ListarUsuarios()
        {
            List<Usuario> usuario = new List<Usuario> 
            {
                new Usuario{IdUsuario=1,Correo="mauri",Clave="123"}
            };

            return usuario;
        }

        [HttpPost]
        [Route("guardar")]

        public dynamic GuardarUsuarios(Usuario usuario)
        {
            usuario.IdUsuario = 2;

            return new
            {
                success = true,
                message = "Usuario registrado",
                result = usuario
            };

        }
        [HttpPost]
        [Route("guardar")]
        public dynamic GuardarUsuarios(Usuario usuario)
        {
            if (usuario.Correo == "algo@algo.com" && usuario.Contraseña == "password") {
                usuario.IdUsuario = 2;
        
                return new
                {
                    success = true,
                    message = "Usuario registrado",
                    result = usuario
                };
            } else {
                return new
                {
                    success = false,
                    message = "Correo o contraseña incorrectos"
                };
            }
        }
    }
}
