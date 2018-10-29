import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarComponent } from './editar/editar.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'listar', component: ListaComponent },
  { path: 'novo', component: EditarComponent },
  { path: 'alterar/:id', component: EditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
