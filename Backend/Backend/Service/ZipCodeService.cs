using Backend.Service.Database;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Backend.Service
{
    public static class ZipCodeService
    {
        public static Deal_ClienteEndereco BuscaEndereco(int cep)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = client.GetAsync("https://viacep.com.br/ws/" + cep + "/json/").Result;
                return response.Content.ReadAsAsync<object>().Result.ToUserAddress();
            }
        }

        public static Deal_ClienteEndereco ToUserAddress(this object e)
        {
            return new Deal_ClienteEndereco
            {
                Logradouro = ((dynamic)e).logradouro.ToString(),
                Cidade = ((dynamic)e).localidade.ToString(),
                Bairro = ((dynamic)e).bairro.ToString(),
                CEP = ((dynamic)e).cep.ToString().Replace(".", "").Replace("-", ""),
                Estado = ((dynamic)e).uf.ToString()
            };
        }
    }
}