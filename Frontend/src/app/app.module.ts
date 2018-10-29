import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CustomPipesModule } from './pipes/custom-pipes.module';
import { ClienteService } from './services/cliente.service';
import { CEPService } from './services/cep.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CustomPipesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ClienteService,
    CEPService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
