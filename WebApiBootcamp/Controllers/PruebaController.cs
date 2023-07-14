﻿using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebApiBootcamp.Models;

namespace WebApiBootcamp.Controllers
{

    [ApiController]
    [Route("prueba")]

    public class PruebaController : ControllerBase
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
            bool usuarioExiste = false;
            bool passwordCorrecta = false;

            using (var db = new SqlConnection(connectionDB))
            {

                //SqlCommand cmd = new SqlCommand("SP_ValidarUsuario", cn);
                //cmd.Parameters.AddWithValue("Correo", usuario.Correo);
                //cmd.Parameters.AddWithValue("Clave", usuario.Clave);
                //cmd.CommandType = CommandType.StoredProcedure;

                //cn.Open();
                //usuario.IdUsuario = Convert.ToInt32(cmd.ExecuteScalar().ToString());
                //cn.Close();

                var sql = "SELECT COUNT(*) FROM Usuario WHERE Correo = @Correo";
                int count = db.ExecuteScalar<int>(sql, new { Correo = usuario.Correo });
                usuarioExiste = count > 0;

                if (usuarioExiste)
                {
                    sql = "SELECT COUNT(*) FROM Usuario WHERE Correo = @Correo AND Clave = @Clave";
                    count = db.ExecuteScalar<int>(sql, new { Correo = usuario.Correo, Clave = usuario.Clave });
                    passwordCorrecta = count > 0;
                }


                if (!usuarioExiste)
                {
                    return new
                    {
                        success = false,
                        message = "El usuario no existe",
                        result = usuario.Correo
                    };
                }
                else if (!passwordCorrecta)
                {
                    return new
                    {
                        success = false,
                        message = "La contraseña es incorrecta",
                        result = usuario.Correo
                    };
                }
                else
                {
                    return new
                    {
                        success = true,
                        message = "Inicio de sesión exitoso",
                        result = usuario.Correo
                    };
                }
            }

        }
    }
}
