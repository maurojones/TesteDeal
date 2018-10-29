import { BaseConfig } from './../../../../_baseConfig';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Deal_Cliente } from '../../../models/deal_cliente';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public listaClientes = new Array<Deal_Cliente>();

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    BaseConfig.loadingShow();
    this.clienteService.getAll().subscribe(x => {
      if (x) {
        this.listaClientes = <Array<Deal_Cliente>>x;
      }
    }, null, () => BaseConfig.loadingClose());
  }

  excluirClinic(id, nome) {
    const confirmar = confirm('Certeza de que deseja excluir o cliente ' + nome + '?');

    if (confirmar) {
      BaseConfig.loadingShow();
      this.clienteService.excluir(id)
        .subscribe(x => {
          if (x) {
            alert('Cliente ' + nome + ' excluido com sucesso');

            for (let i = 0; i < this.listaClientes.length; i++) {
              if (this.listaClientes[i].Id === id) {
                this.listaClientes.splice(i, 1);
                return false;
              }
            }
          } else {
            alert('Ocorreu um problema ao excluir, tente novamente mais tarde');
          }
        }, null, () => BaseConfig.loadingClose());
    }
  }


}
