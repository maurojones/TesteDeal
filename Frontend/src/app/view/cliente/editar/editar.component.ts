import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { BaseConfig } from './../../../../_baseConfig';
import { ClienteService } from '../../../services/cliente.service';

import { Deal_Cliente } from '../../../models/deal_cliente';
import { Deal_ClienteEmail } from '../../../models/deal_clienteemail';
import { Deal_ClienteTelefone } from './../../../models/deal_clientetelefone';
import { Deal_ClienteSocio } from './../../../models/deal_clientesocio';
import { Deal_ClienteEndereco } from './../../../models/deal_clienteendereco';
import { CEPService } from '../../../services/cep.service';
import { CPFValidator } from '../../../validators/cpfValidator';
import { CNPJValidator } from '../../../validators/cnpjValidator';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  public _form: FormGroup;
  private urlId: number;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private cepService: CEPService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.urlId = params['id'] || 0;
      if (this.urlId !== 0) {
        BaseConfig.loadingShow();
        this.clienteService.getById(this.urlId)
          .subscribe(x => {
            if (x) {
              this.initForm(x);
            } else {
              alert('Não foi possível identificar cliente.');
              this.router.navigate(['listar']);
            }
          }, null, () => BaseConfig.loadingClose());
      } else {
        this.initForm(new Deal_Cliente());
      }
    });
  }

  initForm(cliente: Deal_Cliente) {
    this._form = this._fb.group({
      Id: [cliente.Id],
      Nome: [cliente.Nome, [Validators.required]],
      CNPJ: [cliente.CNPJ, [Validators.required, CNPJValidator]],
      Deal_ClienteEmail: this._fb.array([]),
      Deal_ClienteEndereco: this._fb.array([]),
      Deal_ClienteSocio: this._fb.array([]),
      Deal_ClienteTelefone: this._fb.array([])
    });

    if (cliente.Deal_ClienteEmail == null) {
      cliente.Deal_ClienteEmail = new Array<Deal_ClienteEmail>();
      cliente.Deal_ClienteEmail.push(new Deal_ClienteEmail());
    }
    let control = this._form.controls['Deal_ClienteEmail'] as FormArray;
    cliente.Deal_ClienteEmail.forEach(element => {
      control.push(this.initEmail(element));
    });

    if (cliente.Deal_ClienteEndereco == null) {
      cliente.Deal_ClienteEndereco = new Array<Deal_ClienteEndereco>();
      cliente.Deal_ClienteEndereco.push(new Deal_ClienteEndereco());
    }
    control = this._form.controls['Deal_ClienteEndereco'] as FormArray;
    cliente.Deal_ClienteEndereco.forEach(element => {
      control.push(this.initEndereco(element));
    });

    if (cliente.Deal_ClienteSocio == null) {
      cliente.Deal_ClienteSocio = new Array<Deal_ClienteSocio>();
      cliente.Deal_ClienteSocio.push(new Deal_ClienteSocio());
    }
    control = this._form.controls['Deal_ClienteSocio'] as FormArray;
    cliente.Deal_ClienteSocio.forEach(element => {
      control.push(this.initSocio(element));
    });

    if (cliente.Deal_ClienteTelefone == null) {
      cliente.Deal_ClienteTelefone = new Array<Deal_ClienteTelefone>();
      cliente.Deal_ClienteTelefone.push(new Deal_ClienteTelefone());
    }
    control = this._form.controls['Deal_ClienteTelefone'] as FormArray;
    cliente.Deal_ClienteTelefone.forEach(element => {
      control.push(this.initTelefone(element));
    });
  }

  initEmail(email: Deal_ClienteEmail) {
    return this._fb.group({
      Email: [email.Email, [Validators.email, Validators.required]]
    });
  }

  initEndereco(endereco: Deal_ClienteEndereco) {
    return this._fb.group({
      CEP: [endereco.CEP, [Validators.maxLength(8), Validators.minLength(8), Validators.required]],
      Logradouro: [endereco.Logradouro, [Validators.maxLength(150), Validators.required]],
      Numero: [endereco.Numero, [Validators.maxLength(10), Validators.required]],
      Complemento: [endereco.Complemento, [Validators.maxLength(50)]],
      Cidade: [endereco.Cidade, [Validators.maxLength(50), Validators.required]],
      Bairro: [endereco.Bairro, [Validators.maxLength(50), Validators.required]],
      Estado: [endereco.Estado, [Validators.maxLength(2), Validators.minLength(2), Validators.required]]
    });
  }

  initSocio(socio: Deal_ClienteSocio) {
    return this._fb.group({
      CPF: [socio.CPF, [Validators.required, CPFValidator]],
      Nome: [socio.Nome, [Validators.required]]
    });
  }

  initTelefone(telefone: Deal_ClienteTelefone) {
    return this._fb.group({
      Tipo: [telefone.Tipo, [Validators.required]],
      DDD: [telefone.DDD, [Validators.required]],
      Numero: [telefone.Numero, [Validators.required]]
    });
  }

  addEmail() {
    const control = this._form.controls['Deal_ClienteEmail'] as FormArray;
    control.push(this.initEmail(new Deal_ClienteEmail()));
  }

  addEndereco() {
    const control = this._form.controls['Deal_ClienteEndereco'] as FormArray;
    control.push(this.initEndereco(new Deal_ClienteEndereco()));
  }

  addSocio() {
    const control = this._form.controls['Deal_ClienteSocio'] as FormArray;
    control.push(this.initSocio(new Deal_ClienteSocio()));
  }

  addTelefone() {
    const control = this._form.controls['Deal_ClienteTelefone'] as FormArray;
    control.push(this.initTelefone(new Deal_ClienteTelefone()));
  }

  removeRow(formName: string, index: number) {
    const control = this._form.controls[formName] as FormArray;
    control.removeAt(index);
  }

  buscaEndereco(form) {
    BaseConfig.loadingShow();

    this.cepService.get(form.get('CEP').value).subscribe(x => {
      if (x) {
        form.get('Logradouro').setValue(x.Logradouro);
        form.get('Cidade').setValue(x.Cidade);
        form.get('Bairro').setValue(x.Bairro);
        form.get('Estado').setValue(x.Estado);
      }
    }, null, () => BaseConfig.loadingClose());
  }

  validateInternalForm(formName: string) {
    // tslint:disable-next-line:forin
    for (const p in (<FormArray>this._form.get(formName)).controls) {
      const fg = <FormGroup>(<FormArray>this._form.get(formName)).controls[p];
      for (const name in fg.controls) {
        if (fg.get(name).invalid) {
          fg.get(name).markAsTouched();
        }
      }
    }
  }

  onSubmit() {
    this.validateInternalForm('Deal_ClienteEmail');
    this.validateInternalForm('Deal_ClienteEndereco');
    this.validateInternalForm('Deal_ClienteSocio');
    this.validateInternalForm('Deal_ClienteTelefone');

    if (!this._form.valid) {
      for (const name in this._form.controls) {
        if (this._form.get(name).invalid) {
          this._form.get(name).markAsTouched();
        }
      }
      return;
    }

    const client: Deal_Cliente = <Deal_Cliente>JSON.parse(JSON.stringify(this._form.value));
    if (BaseConfig.isLoading) {
      return;
    }

    BaseConfig.loadingShow();
    this.clienteService.salvar(client)
      .subscribe(x => {
        if (x) {
          this.router.navigate(['/cliente/listar']);
        } else {
          alert('Erro ao salvar cliente');
        }
      }, null, () => BaseConfig.loadingClose());

  }
}
