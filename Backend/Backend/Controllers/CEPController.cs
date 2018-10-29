using Backend.Service;
using Backend.Service.Database;
using Newtonsoft.Json;
using System.Web.Http;
using System.Web.Http.Results;

namespace Backend.Controllers
{
    public class CEPController : ApiController
    {
        public JsonResult<Deal_ClienteEndereco> Get(int cep)
        {
            var c = ZipCodeService.BuscaEndereco(cep);
            return Json(c, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
    }
}
