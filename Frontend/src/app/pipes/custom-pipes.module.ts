import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnpjPipe } from './cnpj.pipe';
import { CpfPipe } from './cpf.pipe';

@NgModule({
  declarations: [
    CpfPipe,
    CnpjPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfPipe,
    CnpjPipe
  ]
})
export class CustomPipesModule { }
