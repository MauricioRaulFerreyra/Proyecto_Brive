using Dapper;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using ScrapySharp.Extensions;
using System.Data;
using System.Data.SqlClient;
using WebApiBootcamp.Models;

namespace WebApiBootcamp.Controllers
{
    [ApiController]
    [Route("WebScrapping")]

    public class WebScrappingController : ControllerBase
    {
        static string connectionDB = @"Data Source=DESKTOP-C8APSN0\SQLEXPRESS;Initial Catalog=DB_ACCESO;Integrated Security=true;";

        [HttpGet]
        [Route("listar-prueba")]

        public dynamic ListarPruebaEmpresa()
        {

            using (var db = new SqlConnection(connectionDB))
            {
                //var sqlInsert = "insert into Empresa(Nombre,Vacantes,Fecha) Values (@Nombre,@Vacantes,@Fecha)";
                //var result = db.Execute(sqlInsert, new NewClass("Mauricio", "programador", DateTime.Now));


                var sql = "select IdEmpresa,Nombre,Vacantes,Fecha from Empresa";
                var lst = db.Query<Empresa>(sql);

                foreach (var item in lst)
                {
                    Console.WriteLine(item);
                }

                return lst;
            }


        }

        [HttpGet]
        [Route("listar")]

        public dynamic ListarEmpresa()
        {
            using (var db = new SqlConnection(connectionDB))
            {
                var sql = "select IdEmpresa,Nombre,Vacantes,Fecha from Empresa";
                var lst = db.Query<Empresa>(sql);

                return lst;
            }
        }

        [HttpPost]
        [Route("guardar")]

        public dynamic GuardarEmpresa(string empresa)
        {
            
              List<string> MisVacantes = new List<string>();
           
              HtmlWeb oWeb = new HtmlWeb();
              HtmlDocument empr = oWeb.Load("https://www.occ.com.mx/empleos/"+"de-"+ empresa + "/");

              foreach (var item in empr.DocumentNode.CssSelect("h2"))
              {
                MisVacantes.Add(item.InnerHtml);         
              }

            //using (var db = new SqlConnection(connectionDB))
            //{
            //    var sqlInsert = "insert into TABLAEMPRESA(Nombre,Vacantes) Values (@Nombre,@Vacantes)";
            //    var result = db.Execute(sqlInsert ,(empresa, MisVacantes, DateTime.Now));
            //};


            return MisVacantes;

        }

        internal class NewClass
        {
            public string Nombre { get; }
            public List<string> Vacantes { get; }
            public DateTime Fecha { get; }

            public NewClass(string nombre, List<string> vacantes, DateTime fecha)
            {
                Nombre = nombre;
                Vacantes = vacantes;
                Fecha = fecha;
            }

            public override bool Equals(object? obj)
            {
                return obj is NewClass other &&
                       Nombre == other.Nombre &&
                       Vacantes == other.Vacantes &&
                       Fecha == other.Fecha;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(Nombre, Vacantes, Fecha);
            }
        }
    }
}
