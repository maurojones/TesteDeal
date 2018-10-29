import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const appRoutes = [
    {
        path: '',
        loadChildren: 'app/view/cliente/cliente.module#ClienteModule'
    },
    {
        path: 'cliente',
        loadChildren: 'app/view/cliente/cliente.module#ClienteModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
