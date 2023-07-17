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
        [Route("listar")]

        public dynamic ListarEmpresa()
        {
            using (var db = new SqlConnection(connectionDB))
            {
                var sql = "SELECT IdEmpresa,Nombre,Vacantes,Fecha from Empresa";
                var lst = db.Query<Empresa>(sql);

                return lst;
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<dynamic> GuardarEmpresa([FromBody] Empresa request)
        {
            string? empresa = request.Nombre;

            List<string> MisVacantes = new List<string>();

            string url = "https://www.occ.com.mx/empleos/de-" + empresa + "/";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response;
                try
                {
                    response = await client.GetAsync(url);
                }
                catch (HttpRequestException)
                {
                    return new { success = false, result = "La URL no es válida o no se puede acceder a ella" };
                }

                if (!response.IsSuccessStatusCode)
                {
                    return new { success = false, result = "La URL no existe o no se pudo acceder al recurso" };
                }
            }

            HtmlWeb oWeb = new HtmlWeb();
            HtmlDocument empr = oWeb.Load(url);

            foreach (var item in empr.DocumentNode.CssSelect("h2"))
            {
                string vacante = item.InnerHtml;
                if (vacante.Length > 200)
                {
                    vacante = vacante.Substring(0, 200);
                }
                MisVacantes.Add(vacante);
            }

            using (var db = new SqlConnection(connectionDB))
            {
                var sqlInsert = "INSERT INTO DB_ACCESO.dbo.Empresa (Nombre, Vacantes, Fecha) VALUES (@Nombre, @Vacantes, @Fecha)";
                var parameters = new { Nombre = empresa, Vacantes = string.Join(", ", MisVacantes), Fecha = DateTime.Now };
                var result = db.Execute(sqlInsert, parameters);
            }

            return new { totalEmpleos = MisVacantes, fechaBusqueda = DateTime.Now };

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

