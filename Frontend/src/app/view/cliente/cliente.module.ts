import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '../../../../node_modules/@angular/forms';
import { NgxMaskModule } from '../../../../node_modules/ngx-mask';
import { CustomPipesModule } from '../../pipes/custom-pipes.module';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CustomPipesModule,
    FormsModule,
    ClienteRoutingModule
  ],
  declarations: [ListaComponent, EditarComponent]
})
export class ClienteModule { }
