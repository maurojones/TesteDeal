using Backend.Service;
using Backend.Service.Database;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;

namespace Backend.Controllers
{
    public class ClienteController : ApiController
    {
        public JsonResult<List<Deal_Cliente>> Get()
        {
            var c = ClienteService.Get();
            return Json(c, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }

        public JsonResult<Deal_Cliente> Get(int id)
        {
            var c = ClienteService.Get(id);
            return Json(c, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }

        public JsonResult<bool> Post([FromBody] Deal_Cliente cliente)
        {
            var c = ClienteService.Salvar(cliente);
            return Json(c);
        }

        public JsonResult<bool> Delete(int id)
        {
            var c = ClienteService.Deletar(id);
            return Json(c);
        }
    }
}
