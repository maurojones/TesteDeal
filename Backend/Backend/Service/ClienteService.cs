using Backend.Service.Database;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using System;

namespace Backend.Service
{
    public static class ClienteService
    {
        public static List<Deal_Cliente> Get()
        {
            var context = new DBEntities();
            return context.Deal_Cliente
                            .Include(c => c.Deal_ClienteEmail)
                            .Include(c => c.Deal_ClienteEndereco)
                            .Include(c => c.Deal_ClienteSocio)
                            .Include(c => c.Deal_ClienteTelefone)
                            .OrderBy(c => c.Nome)
                            .ToList();
        }

        public static Deal_Cliente Get(int id)
        {
            var context = new DBEntities();
            return context.Deal_Cliente
                            .Include(c => c.Deal_ClienteEmail)
                            .Include(c => c.Deal_ClienteEndereco)
                            .Include(c => c.Deal_ClienteSocio)
                            .Include(c => c.Deal_ClienteTelefone)
                            .FirstOrDefault(c => c.Id == id);
        }

        public static bool Deletar(int id)
        {
            try
            {
                var context = new DBEntities();
                var old = context.Deal_Cliente.Find(id);
                context.Deal_Cliente.Remove(old);
                context.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool Salvar(Deal_Cliente cliente)
        {
            using (var context = new DBEntities())
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    if (cliente.Id == 0)
                    {
                        context.Deal_Cliente.Add(cliente);
                    }
                    else
                    {
                        var old = context.Deal_Cliente
                                            .Include(c => c.Deal_ClienteEmail)
                                            .Include(c => c.Deal_ClienteEndereco)
                                            .Include(c => c.Deal_ClienteSocio)
                                            .Include(c => c.Deal_ClienteTelefone)
                                            .FirstOrDefault(c => c.Id == cliente.Id);
                        context.Entry(old).CurrentValues.SetValues(cliente);

                        old.Deal_ClienteEmail.ToList().ForEach(c => context.Deal_ClienteEmail.Remove(c));
                        cliente.Deal_ClienteEmail.ToList().ForEach(c => old.Deal_ClienteEmail.Add(c));

                        old.Deal_ClienteEndereco.ToList().ForEach(c => context.Deal_ClienteEndereco.Remove(c));
                        cliente.Deal_ClienteEndereco.ToList().ForEach(c => old.Deal_ClienteEndereco.Add(c));

                        old.Deal_ClienteSocio.ToList().ForEach(c => context.Deal_ClienteSocio.Remove(c));
                        cliente.Deal_ClienteSocio.ToList().ForEach(c => old.Deal_ClienteSocio.Add(c));

                        old.Deal_ClienteTelefone.ToList().ForEach(c => context.Deal_ClienteTelefone.Remove(c));
                        cliente.Deal_ClienteTelefone.ToList().ForEach(c => old.Deal_ClienteTelefone.Add(c));
                    }
                    context.SaveChanges();

                    transaction.Commit();

                    return true;
                }
                catch
                {
                    transaction.Rollback();

                    return false;
                }
            }
        }
    }
}